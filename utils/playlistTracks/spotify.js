const getSpotifyPlaylistTracks = async (req) => {
    const accessToken = await getAccessToken(req);
    const response = await fetch(
        `https://api.spotify.com/v1/playlists/${req.params.playlistId}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );

    const responseJSON = response.json;
    return responseJSON.items.map(({ track }) => ({ ...track, type: 0 }));
}

module.exports = getSpotifyPlaylistTracks;