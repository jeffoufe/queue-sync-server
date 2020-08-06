const getParty = require('../getParty');

const getSoundCloudPlaylist = async (req) => {
    const { soundCloudPlaylists } = await getParty(req, req.params.userId);
    return soundCloudPlaylists.find(({ id }) => id === req.params.playlistId);

}

module.exports = getSoundCloudPlaylist;