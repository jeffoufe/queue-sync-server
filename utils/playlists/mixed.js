const getMixedPlaylists = async (req) => {
    const playlists = await req.app.locals.playlists.find({ userId: req.params.userId }).toArray();
    return playlists.map(playlist => ({ ...playlist, type: -1 }));
}

module.exports = getMixedPlaylists;