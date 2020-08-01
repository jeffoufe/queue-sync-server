const ObjectID = require('mongodb').ObjectID;

const logoutSpotify = async (req) => {
    console.log(req.params.userId);
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $unset: { "credentials.spotify": 1 } }
    )
}

module.exports = logoutSpotify;