const searchSpotify = require('./spotify');
const searchSoundCloud = require('./soundcloud');

const search = async (req) => {
    let tracks;
    switch (req.query.type) {
        case '0':
            tracks = await searchSpotify(req);
            break;
        case '1':
            tracks = await searchSoundCloud(req);
            break;
        default:
            break;
    }
    return tracks;
};

module.exports = search;