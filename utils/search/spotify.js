const fetch = require('node-fetch');
const getAccessToken = require('../getAccessToken');

const searchSpotify = async (req) => {
    const accessToken = await getAccessToken(req);
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${req.query.q}&type=track`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    const responseJSON = await response.json();
    return responseJSON.tracks.items.map((item) => ({ ...item, type: 0 }));
}

module.exports = searchSpotify;