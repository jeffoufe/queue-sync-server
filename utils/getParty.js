const ObjectID = require('mongodb').ObjectID;

const getParty = async (req) => {
    const id = req.params.userId;
    const users = await req.app.locals.users.find(ObjectID(id || req.params.id)).toArray();
    return users[0]; 
};

module.exports = getParty;