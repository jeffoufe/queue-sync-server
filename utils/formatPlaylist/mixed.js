const formatMixedPlaylist = (playlist) => ({
    ...playlist,
    id: playlist['_id'],
    total: playlist.tracks.length
});

module.exports = formatMixedPlaylist