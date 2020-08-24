const getParty = require('../getParty');
const fetch = require('node-fetch');

const getSoundCloudPlaylistTracks = async (req) => {
    const party = await getParty(req, req.params.userId);
    const offset = req.query.offset ? parseInt(req.query.offset) : 0;

    const ids = party.soundCloudPlaylists.find(({ id }) => id === req.params.playlistId).ids;
    const rangedIds = ids.slice(offset, offset + 50).join('%2C');
    const response = await fetch(
        `https://api-v2.soundcloud.com/tracks?ids=${rangedIds}&client_id=LwwkfCVkKXcE8djbcXfrQLnZZBqZk3f3&%5Bobject%20Object%5D=&app_version=1595844156&app_locale=en`
    );

    const responseJSON = await response.json();
    return responseJSON.map((track) => ({ ...track, type: 1 }))
}

module.exports = getSoundCloudPlaylistTracks