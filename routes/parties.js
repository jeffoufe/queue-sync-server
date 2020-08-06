const express = require('express');
const router = express.Router();
const getParty = require('../utils/getParty');
const authorize = require('../utils/authorize/index');
const logout = require('../utils/logout/index');
const getFullParty = require('../utils/getFullParty');

router.get('/', async (req, res) => {
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
    const party = await getFullParty(req);
    res.json(party); 
})

router.post('/:userId/authorize', async (req, res) => {
    await authorize(req);
    const party = await getParty(req, req.params.userId);
    res.json({ credentials: party.credentials });
});

router.post('/:userId/logout', async (req, res) => {
    await logout(req);
    const party = await getParty(req, req.params.userId);
    res.json({ credentials: party.credentials });
});

router.get('/:userId/credentials', async (req, res) => {
    const party = await getParty(req, req.params.userId);
    res.json({ credentials: party.credentials });
});

module.exports = router
