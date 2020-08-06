const formatSoundCloudTrack = require('./soundcloud');
const formatSpotifyTrack = require('./spotify');

const formatTrack = (track, userId) => {
    const formatFn = (() => {
        switch (track.type) {
            case 0:
                return formatSpotifyTrack;
            case 1:
                return formatSoundCloudTrack;
            case -1:
                return track => track;
            default:
                return null;
        }
    })();
    
    return formatFn ? formatFn(track, userId) : null
};

module.exports = formatTrack;