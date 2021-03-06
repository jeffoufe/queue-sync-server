const ObjectID = require('mongodb').ObjectID;

const getMixedPlaylist = async (req) => {
    const playlist = await req.app.locals.playlists.find(ObjectID(req.params.playlistId)).toArray();
    return playlist[0].tracks.map((track) => ({ ...track, type: -1 }))
}

module.exports = getMixedPlaylist;