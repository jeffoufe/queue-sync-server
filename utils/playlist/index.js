const getMixedPlaylist = require('./mixed');
const getSpotifyPlaylist = require('./spotify');
const getSoundCloudPlaylist = require('./soundcloud');

const getPlaylist = async (req) => {
    let playlist;
    switch (req.query.type) {
        case '-1':
            playlist = await getMixedPlaylist(req);
            break;
        case '0':
            playlist = await getSpotifyPlaylist(req);
            break;
        case '1':
            // SoundCloud Playlists are stored in database
            playlist = await getSoundCloudPlaylist(req);
            break;
        default:
            playlist = null;
    }
    return playlist;
};

module.exports = getPlaylist;