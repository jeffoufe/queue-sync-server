const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const getParty = require('../utils/getParty');

router.get('/', async (req, res, next) => {
    const parties = await req.app.locals.parties.find({}).toArray();
    res.json({ parties });
});

router.post('/', async (req, res) => {
    await req.app.locals.parties.insertOne({ 
        tracks: [],
        soundCloudPlaylists: [],
        playlists: [],
        name: req.body.name,
        users: [{ name: req.body.hostName || 'Admin', isHost: true }]
    }, (error, documentInserted) => {
        if (error) {
            res.send(err);
        } else {
            res.json(documentInserted.ops[0])
        }
    })
})

router.get('/:id', async (req, res) => {
    const party = await getParty(req)
    res.json(party); 
})

router.post('/:id/track', async (req, res) => {
    const track = req.body.track;
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.id) },
        { $push: { tracks: track } }
    )
    if (track.type === "youtube") {
        const YD = new YoutubeMp3Downloader({
            "ffmpegPath": "/usr/local/bin/ffmpeg",        // Where is the FFmpeg binary located?
            "outputPath": "/Users/jeffreydecorde/Downloads/",    // Where should the downloaded and encoded files be stored?
            "youtubeVideoQuality": "highest",       // What video quality should be used?
            "queueParallelism": 2,                  // How many parallel downloads/encodes should be started?
            "progressTimeout": 2000                 // How long should be the interval of the progress reports
        });
        YD.download(track.id);
        YD.on("finished", async (err, data) => {
            await req.app.locals.parties.updateOne(
                { _id: ObjectID(req.params.id) },
                { $set: { "tracks.$[elem].file" : data.file } },
                { arrayFilters: [{ "elem.id": track.id }] }
            )
            const party = await getParty(req);
            res.json(party);
        });
        YD.on("progress", (progress) => {
            console.log(req.params.id, ' ', track.id);
            req.app.locals.parties.updateOne(
                { _id: ObjectID(req.params.id) },
                { $set: { "tracks.$[elem].progress" : progress.progress.percentage } },
                { arrayFilters: [{ "elem.id": track.id }] }
            )
        });
    } else {
        const party = await getParty(req);
        res.json(party);
    }
})

router.get('/:id/:trackId/stream', async (req, res) => {
    const party = await getParty(req);
    const { file } = party.tracks.find((track) => track.id === req.params.trackId);
    fs.exists(file, (exists) => {
        if (exists) {
            const rstream = fs.createReadStream(file);
            rstream.pipe(res);
        } else {
            res.status('500').send({ error: 'The track is not ready yet' });
            res.end();
        }
    });
})

router.delete('/:id/track/:trackId', async (req, res) => {
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.id) },
        { $pull: { tracks: { id: req.params.trackId } } }
    )
    const party = await getParty(req);
    res.json(party);
})

router.post('/:id/sc-playlists', async (req, res) => {
    const { playlist: { image, ...rest } } = req.body;
    const formattedPlaylist = {
        ...rest,
        images: [{ url: image }]
    }
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.id) },
        { $push: { soundCloudPlaylists: formattedPlaylist } }
    )
    res.end()
})

router.get('/:id/sc-playlists', async (req, res) => {
    const { soundCloudPlaylists } = await getParty(req);
    res.json({ items: soundCloudPlaylists });
})

module.exports = router
