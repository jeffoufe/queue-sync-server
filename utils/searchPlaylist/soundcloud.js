const fetch = require('node-fetch');

const searchSoundCloudPlaylists = async (search) => {
    const response = await fetch(
        `https://api-v2.soundcloud.com/search/playlists_without_albums?q=${search}&client_id=LwwkfCVkKXcE8djbcXfrQLnZZBqZk3f3`
    );
    const responseJSON = await response.json();
    return responseJSON.collection.map((track) => ({ ...track, type: 1 }))
}

module.exports = searchSoundCloudPlaylists;