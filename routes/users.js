const express = require('express');
const router = express.Router();
const getParty = require('../utils/getParty');
const authorize = require('../utils/authorize/index');
const selectDevice = require('../utils/selectDevice');
const logout = require('../utils/logout/index');
const getFullParty = require('../utils/getFullParty');

router.get('/', async (req, res) => {
    const users = await req.app.locals.users.find({}).toArray();
    res.json({ users });
});

router.post('/', async (req, res) => {
    await req.app.locals.users.insertOne({ 
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

router.post('/:userId/selectDevice', async (req, res) => {
    await selectDevice(req);
    const party = await getParty(req);
    res.json({ credentials: party.credentials });
});

router.post('/:userId/authorize', async (req, res) => {
    await authorize(req);
    const party = await getParty(req);
    res.json({ credentials: party.credentials });
});

router.post('/:userId/logout', async (req, res) => {
    await logout(req);
    const party = await getParty(req);
    res.json({ credentials: party.credentials });
});

router.get('/:userId/credentials', async (req, res) => {
    const party = await getParty(req);
    res.json({ credentials: party.credentials });
});

router.put('/:userId/play', async (req) => {
    await toggle(req, true);
    const party = await getFullParty(req);
    res.json(party);
});

router.put('/:userId/pause', async (req) => {
    await toggle(req, false);
    const party = await getFullParty(req);
    res.json(party);
});

module.exports = router
