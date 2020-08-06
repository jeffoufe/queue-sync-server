const getSpotifyPlaylistTracks = require('./spotify');
const getSoundCloudPlaylistTracks = require('./soundcloud');
const getMixedPlaylistTracks = require('./mixed');

const getPlaylistTracks = async (req) => {
    let tracks;
    switch (req.query.type) {
        case '-1':
            tracks = await getMixedPlaylistTracks(req);
            break;
        case '0':
            tracks = await getSpotifyPlaylistTracks(req);
            break;
        case '1':
            tracks = await getSoundCloudPlaylistTracks(req);
            break;
        default:
            break;
    }
    return tracks;
};

module.exports = getPlaylistTracks;