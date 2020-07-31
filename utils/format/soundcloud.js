const formatSoundCloudTrack = (track, userId) => {
    let stream;
    if (track && track.media && track.media.transcodings) {
        stream = track.media.transcodings.filter(
            transcoding => transcoding.format.protocol === 'progressive'
        )[0];
    }
    if (!stream) return {};
    return {
        image: track['artwork_url'] || track.user['avatar_url'],
        artist: track.user.username || track.user['full_name'],
        name: track.title,
        id: `${track.id}`,
        type: track.type,
        userId,
        isPlayed: false,
        url: stream.url
    }
}

module.exports = formatSoundCloudTrack;