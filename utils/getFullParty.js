const getParty = require('./getParty');

const getFullParty = async (req) => {
    const [party, tracks] = await Promise.all([
        getParty(req, req.params.userId),
        req.app.locals.tracks.find({ userId: req.params.userId }).toArray()
    ]);
    return { ...party, tracks };
}

module.exports = getFullParty;