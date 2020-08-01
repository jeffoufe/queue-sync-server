const formatSpotifyPlaylist = (playlist) => ({
    name: playlist.name,
    image: playlist.images[0].url,
    type: playlist.type,
    id: playlist.id,
    type: playlist.type
})

module.exports = formatSpotifyPlaylist