const express = require('express');
const router = express.Router();
const getParty = require('../utils/getParty');
const authorize = require('../utils/authorize/index');

router.get('/', async (req, res, next) => {
    const parties = await req.app.locals.parties.find({}).toArray();
    res.json({ parties });
});

router.post('/', async (req, res) => {
    await req.app.locals.parties.insertOne({ 
        tracks: [],
        soundCloudPlaylists: [],
        credentials: {},
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

router.get('/:userId', async (req, res) => {
    const [party, tracks] = await Promise.all([
        getParty(req, req.params.userId),
        req.app.locals.tracks.find({ userId: req.params.userId }).toArray()
    ]);
    res.json({
        ...party,
        tracks
    }); 
})
router.post('/:userId/authorize', async (req, res) => {
    await authorize(req);
    const party = await getParty(req, req.params.userId);
    res.json({ credentials: party.credentials });
});

module.exports = router
