const ObjectID = require('mongodb').ObjectID;

const selectDeviceSpotify = async (req) => {
    const { deviceID } = req.body;
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $set: { "credentials.spotify.deviceID": deviceID } }
    )
}

module.exports = selectDeviceSpotify