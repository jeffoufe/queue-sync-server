const express = require('express');
const router = express.Router({ mergeParams: true });
const ObjectID = require('mongodb').ObjectID;
const getParty = require('../utils/getParty');

router.post('/', async (req, res) => {
    const { playlist: { image, ...rest } } = req.body;
    const formattedPlaylist = {
        ...rest,
        images: [{ url: image }]
    }
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $push: { soundCloudPlaylists: formattedPlaylist } }
    )
    res.end()
})

router.get('/', async (req, res) => {
    const { soundCloudPlaylists } = await getParty(req, req.params.userId);
    res.json({ items: soundCloudPlaylists });
})

router.get('/:playlistId/tracks', async (req, res) => {
    const { soundCloudPlaylists } = await getParty(req, req.params.userId);
    res.json(soundCloudPlaylists.find(playlist => playlist.id === req.params.playlistId).ids);
})

module.exports = router