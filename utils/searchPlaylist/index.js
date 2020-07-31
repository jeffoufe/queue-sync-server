const searchSoundCloudPlaylist = require('./soundcloud');

const searchPlaylist = async (search, type) => {
    let playlists;
    switch (type) {
        case '1':
            playlists = await searchSoundCloudPlaylist(search);
            break;
        default:
            break;
    }
    return playlists;
};

module.exports = searchPlaylist;