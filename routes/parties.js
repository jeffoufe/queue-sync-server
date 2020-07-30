const express = require('express');
const router = express.Router();
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

module.exports = router
