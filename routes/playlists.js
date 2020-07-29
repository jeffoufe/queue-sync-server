const express = require('express');
const router = express.Router({ mergeParams: true });
const ObjectID = require('mongodb').ObjectID;

router.get('/', async (req, res) => {
    const items = await req.app.locals.playlists.find({ userId: req.params.userId }).toArray();
    res.json({ items });
})

router.post('/', async (req, res) => {
    const { playlist } = req.body;
    const formattedPlaylist = {
        ...playlist,
        tracks: [],
        playlists: [],
    }

    await req.app.locals.playlists.insertOne(
        formattedPlaylist, 
        async (error, documentInserted) => {
            if (error) {
                res.send(err);
            } else {
                await req.app.locals.parties.updateOne(
                    { _id: ObjectID(req.params.userId) },
                    { $push: { playlists: documentInserted.ops[0]['_id'] } }
                )
                res.json(documentInserted.ops[0]);
            }
        }
    );
})

router.get('/:playlistId', async (req, res) => {
    const playlist = await req.app.locals.playlists.find(ObjectID(req.params.playlistId)).toArray()[0];
    res.json(playlist);
})

router.post('/:playlistId/track', async (req, res) => {
    await req.app.locals.playlists.updateOne(
        { _id: ObjectID(req.params.playlistId) },
        { $push: { tracks: req.body.track } }
    )
    const playlists = await req.app.locals.playlists.find(ObjectID(req.params.playlistId)).toArray();
    res.json({ items: playlists[0].tracks });
})

router.get('/:playlistId/track', async (req, res) => {
    const playlistsResponse = await req.app.locals.playlists.find(ObjectID(req.params.playlistId)).toArray();
    const { tracks, playlists } = playlistsResponse[0];
    res.json({ tracks, playlists });
})

router.post('/:playlistId/playlist', async (req, res) => {
    await req.app.locals.playlists.updateOne(
        { _id: ObjectID(req.params.playlistId) },
        { $push: { playlists: req.body.playlist } }
    )
    const playlists = await req.app.locals.playlists.find(ObjectID(req.params.playlistId)).toArray();
    res.json({ items: playlists[0] });
})

router.delete('/:playlistId/track/:trackId', async (req, res) => {
    await req.app.locals.playlists.updateOne(
        { _id: ObjectID(req.params.playlistId) },
        { $pull: { tracks: { id: req.params.trackId } } }
    )
    const playlists = await req.app.locals.playlists.find(ObjectID(req.params.playlistId)).toArray();
    res.json({ items: playlists[0].tracks });
})

module.exports = router