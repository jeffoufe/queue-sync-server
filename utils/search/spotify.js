const fetch = require('node-fetch');

const searchSpotify = async (search) => {
    const accessToken = await getAccessToken(req);
    const response = await fetch(
        `https://api.spotify.com/v1/search?q=${search}&type=track`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    return response.tracks.items.map((item) => ({ ...item, type: 0 }));
}

module.exports = searchSpotify;