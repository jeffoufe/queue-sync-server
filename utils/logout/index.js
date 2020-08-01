const logoutSpotify = require('./spotify');

const logout = async (req) => {
    switch (req.query.type) {
        case '0':
            await logoutSpotify(req);
        default:
            return [];
    }
};

module.exports = logout;