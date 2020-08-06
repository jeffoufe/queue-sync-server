const express = require('express');
const router = express.Router({ mergeParams: true });
const ObjectID = require('mongodb').ObjectID;
const searchPlaylist = require('../utils/searchPlaylist/index')
const formatPlaylist = require('../utils/formatPlaylist/index')
const formatTrack = require('../utils/format/index')
const getPlaylistTracks = require('../utils/playlistTracks/index');
const getPlaylists = require('../utils/playlists/index');
const getPlaylist = require('../utils/playlist/index');

router.get('/', async (req, res) => {
    let playlists = await getPlaylists(req);
    if (req.query.type !== '1') {
        playlists = playlists.map(formatPlaylist);
    }
    res.json({ playlists });
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

router.get('/search', async (req, res) => {
    const { type, q } = req.query;
    const playlists = await searchPlaylist(q, type);
    const formattedPlaylists = playlists.map((playlist) => formatPlaylist(playlist))
    res.json({ playlists: formattedPlaylists }); 
})

/* router.get('/:playlistId/tracks', async (req, res) => {
    const { type } = req.query;
    const tracks = await getPlaylistTracks(req, type);
    const formattedTracks = tracks.map((track) => formatTrack(track))
    res.json({ tracks: formattedTracks });
}) */

router.get('/:playlistId', async (req, res) => {
    let playlist = await getPlaylist(req);
    const tracks = await getPlaylistTracks(req);
    const formattedTracks = (tracks || []).map((track) => formatTrack(track))
    if (req.query.type !== '1') {
        playlist = formatPlaylist(playlist);
    }
    res.json({ ...playlist, tracks: formattedTracks });
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