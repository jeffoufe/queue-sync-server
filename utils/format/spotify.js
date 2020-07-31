const formatSpotifyTrack = (track, userId) => ({
    image: track.album.images[track.album.images.length - 1].url,
    name: track.name,
    id: `${track.id}`,
    isPlayed: false,
    type: PROVIDERS[SPOTIFY],
    userId,
    type: track.type,
    duration: track['duration_ms'],
    artist: track.artists.map((artist) => artist.name).join(', '),
})

module.exports = formatSpotifyTrack;