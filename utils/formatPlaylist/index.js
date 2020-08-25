const formatSoundCloudPlaylist = require('./soundcloud');
const formatSpotifyPlaylist = require('./spotify');
const formatMixedPlaylist = require('./mixed');

const formatPlaylist = (playlist) => {
    const formatFn = (() => {
        switch (playlist.type) {
            case -1:
                return formatMixedPlaylist;
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