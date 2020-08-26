const ObjectID = require('mongodb').ObjectID;

const selectDeviceSpotify = async (req) => {
    const { deviceID } = req.body;
    await req.app.locals.users.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $set: { "credentials.spotify.deviceID": deviceID } }
    )
}

module.exports = selectDeviceSpotify