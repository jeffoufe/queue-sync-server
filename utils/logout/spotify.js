export const logoutSpotify = (req) => {
    await req.app.locals.parties.updateOne(
        { _id: ObjectID(req.params.userId) },
        { $set: { spotify: {} } }
    )
}