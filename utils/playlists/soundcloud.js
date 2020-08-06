const getParty = require('../getParty');

const getSoundCloudPlaylists = async (req) => {
    const { soundCloudPlaylists } = await getParty(req, req.params.userId);
    return soundCloudPlaylists;
}

module.exports = getSoundCloudPlaylists;