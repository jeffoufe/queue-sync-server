const fetch = require('node-fetch');

const searchSoundCloud = async (req) => {
    const response = await fetch(
        `https://api-v2.soundcloud.com/search/tracks?q=${req.query.q}&client_id=iZIs9mchVcX5lhVRyQGGAYlNPVldzAoX`,
    );
    const responseJSON = await response.json();
    return responseJSON.collection.map((track) => ({ ...track, type: 1 }))
}

module.exports = searchSoundCloud;