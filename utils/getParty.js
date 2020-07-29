const ObjectID = require('mongodb').ObjectID;

const getParty = async (req, id) => {
    const parties = await req.app.locals.parties.find(ObjectID(id || req.params.id)).toArray();
    return parties[0]; 
};

module.exports = getParty;