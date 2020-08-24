const fetch = require('node-fetch');
const getAccessToken = require('../getAccessToken');

const getSpotifyPlaylistTracks = async (req) => {
    const accessToken = await getAccessToken(req);
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;
    const response = await fetch(
        `https://api.spotify.com/v1/playlists/${req.params.playlistId}/tracks?limit=50&offset=${offset}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    const responseJSON = await response.json();
    return responseJSON.items.map(({ track }) => ({ ...track, type: 0 }));
}

module.exports = getSpotifyPlaylistTracks;