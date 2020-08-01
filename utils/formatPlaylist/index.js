const formatSoundCloudPlaylist = require('./soundcloud');
const formatSpotifyPlaylist = require('./spotify');

const formatPlaylist = (playlist) => {
    const formatFn = (() => {
        switch (playlist.type) {
            case -1:
                return playlist => playlist;
            case 0:
                return formatSpotifyPlaylist;
            case 1:
                return formatSoundCloudPlaylist;
            default:
                return null;
        }
    })();
    
    return formatFn ? formatFn(playlist) : null
};

module.exports = formatPlaylist;