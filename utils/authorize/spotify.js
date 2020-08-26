const ObjectID = require('mongodb').ObjectID;

const formatSpotify = (spotify) => ({
    accessToken: spotify.access_token,
    refreshToken: spotify.refresh_token,
    expirationTime: new Date().getTime() + spotify['expires_in'] * 1000,
    deviceID: spotify.deviceID
})

const authorizeSpotify = async (req) => {
    const spotify = formatSpotify(req.body);
    await req.app.locals.users.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $set: { "credentials.spotify": spotify } }
    )
}

module.exports = authorizeSpotify