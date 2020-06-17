const express = require('express');
const router = express.Router();
const ObjectID = require('mongodb').ObjectID;
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

const getParty = async (req) => {
    const parties = await req.app.locals.parties.find(ObjectID(req.params.id)).toArray();
    return parties[0]; 
};

router.get('/', async (req, res, next) => {
    const parties = await req.app.locals.parties.find({}).toArray();
    res.json({ parties });
});

router.post('/', async (req, res) => {
    await req.app.locals.parties.insertOne({ 
        tracks: [],
        name: req.body.name
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
        { $push: { tracks: req.body.track } }
    )
    const party = await getParty(req);
    res.json(party);
})

router.delete('/:id/track/:trackId', async (req, res) => {
    await req.app.locals.parties.update(
        { _id: ObjectID(req.params.id) },
        { $pull: { tracks: { id: req.params.trackId } } },
        { multi: true }
    )
    const party = await getParty(req);
    res.json(party);
})

module.exports = router;
