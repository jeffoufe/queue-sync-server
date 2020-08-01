const getMixedPlaylists = require('./mixed');
const getSpotifyPlaylists = require('./spotify');

const getPlaylists = async (req) => {
    let playlists;
    switch (req.query.type) {
        case '-1':
            playlists = await getMixedPlaylists(req);
        case '0':
            playlists = await getSpotifyPlaylists(req);
        default:
            return [];
    }
};

module.exports = getPlaylists;