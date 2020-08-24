const formatSpotifyPlaylist = (playlist) => ({
    name: playlist.name,
    total: playlist.total,
    image: playlist.images[0].url,
    type: playlist.type,
    id: playlist.id,
    type: playlist.type
})

module.exports = formatSpotifyPlaylist