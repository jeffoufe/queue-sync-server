const getMixedPlaylists = require('./mixed');
const getSpotifyPlaylists = require('./spotify');
const getSoundCloudPlaylists = require('./soundcloud');

const getPlaylists = async (req) => {
    let playlists;
    switch (req.query.type) {
        case '-1':
            playlists = await getMixedPlaylists(req);
            break;
        case '0':
            playlists = await getSpotifyPlaylists(req);
            break;
        case '1':
            // SoundCloud Playlists are stored in databasde
            playlists = await getSoundCloudPlaylists(req);
            break;
        default:
            playlists = [];
    }
    return playlists;
};

module.exports = getPlaylists;