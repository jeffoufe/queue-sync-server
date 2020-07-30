const express = require('express');
const router = express.Router({ mergeParams: true });
const ObjectID = require('mongodb').ObjectID;
const fs = require('fs');
const getParty = require('../utils/getParty');
// const YoutubeMp3Downloader = require("youtube-mp3-downloader");

router.post('/', async (req, res) => {
    const { tracks } = req.body;
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $push: { tracks: { $each: tracks } } }
    )
    /* if (track.type === "youtube") {
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
                { _id: ObjectID(req.params.userId) },
                { $set: { "tracks.$[elem].file" : data.file } },
                { arrayFilters: [{ "elem.id": track.id }] }
            )
            const party = await getParty(req, req.params.userId);
            res.json(party);
        });
        YD.on("progress", (progress) => {
            req.app.locals.parties.updateOne(
                { _id: ObjectID(req.params.userId) },
                { $set: { "tracks.$[elem].progress" : progress.progress.percentage } },
                { arrayFilters: [{ "elem.id": track.id }] }
            )
        });
    } else {
        const party = await getParty(req.params.userId);
        res.json(party);
    } */
    const party = await getParty(req, req.params.userId);
    res.json(party);
})

router.get('/:trackId/stream', async (req, res) => {
    const party = await getParty(req, req.params.userId);
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

router.delete('/:trackId', async (req, res) => {
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $pull: { tracks: { id: req.params.trackId } } }
    )
    const party = await getParty(req, req.params.userId);
    res.json(party);
})

module.exports = router