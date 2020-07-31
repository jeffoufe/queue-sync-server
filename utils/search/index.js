const searchSpotify = require('./spotify');
const searchSoundCloud = require('./soundcloud');

const search = async (search, type) => {
    let tracks;
    switch (type) {
        case '0':
            tracks = await searchSpotify(search);
            break;
        case '1':
            tracks = await searchSoundCloud(search);
            break;
        default:
            break;
    }
    return tracks;
};

module.exports = search;