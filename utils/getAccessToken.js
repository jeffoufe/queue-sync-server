const getParty = require('./getParty');

const getAccessToken = async (req) => {
    const party = await getParty(req, req.params.userId);
    return party.credentials.spotify.accessToken
};

module.exports = getAccessToken;