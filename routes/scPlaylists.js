const express = require('express');
const router = express.Router({ mergeParams: true });
const ObjectID = require('mongodb').ObjectID;
const getParty = require('../utils/getParty');

router.post('/', async (req, res) => {
    const { playlist } = req.body;
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $push: { soundCloudPlaylists: playlist } }
    )
    res.end();
})

router.delete('/:playlistId', async (req, res) => {
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $pull: { soundCloudPlaylists: { id: req.params.playlistId } } }
    );
    res.end();
})

router.get('/:playlistId/tracks', async (req, res) => {
    const { soundCloudPlaylists } = await getParty(req, req.params.userId);
    res.json(soundCloudPlaylists.find(playlist => playlist.id === req.params.playlistId).ids);
})

module.exports = router