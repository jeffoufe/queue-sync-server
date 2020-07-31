const formatSoundCloudPlaylist = (playlist) => ({
    image: playlist.tracks[0]['artwork_url'] || playlist.tracks[0].user['avatar_url'],
    artist: `${playlist.track_count} tracks`,
    name: playlist.title,
    ids: playlist.tracks.map((track) => track.id),
    id: `${playlist.id}`,
    type: playlist.type,
})

module.exports = formatSoundCloudPlaylist