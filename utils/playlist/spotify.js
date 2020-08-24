const fetch = require('node-fetch');
const getAccessToken = require('../getAccessToken');

const getSpotifyPlaylist = async (req) => {
    const accessToken = await getAccessToken(req);
    const response = await fetch(
        `https://api.spotify.com/v1/playlists/${req.params.playlistId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    const responseJSON = await response.json();
    return { ...responseJSON, type: 0, total: responseJSON.tracks.total };
}

module.exports = getSpotifyPlaylist;