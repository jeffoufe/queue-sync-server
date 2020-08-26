const toggle = async (req, isPlayed) => {
    const party = await getParty(req);
    const firstTrackId = party.tracks[0];

    await req.app.locals.tracks.updateOne(
        { _id: firstTrackId },
        { $set: { isPlayed } }
    )
}

module.exports = toggle;