const fetch = require('node-fetch');

const getSpotifyPlaylists = async (req) => {
    const accessToken = await getAccessToken(req);
    const response = await fetch(
        `https://api.spotify.com/v1/me/playlists`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    return response.items.map((item) => ({ ...item, type: 0 }));
}

module.exports = getSpotifyPlaylists;