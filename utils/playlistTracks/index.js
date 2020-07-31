const getSpotifyPlaylistTracks = require('./spotify');
const getSoundCloudPlaylistTracks = require('./soundcloud');

const getPlaylistTracks = async (req, type) => {
    let tracks;
    switch (type) {
        case '-1':
            // tracks = await getMixedPlaylistTracks(req);
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