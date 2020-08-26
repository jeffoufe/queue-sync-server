const authorizeSpotify = require('./spotify');

const authorize = async (req) => {
    switch (req.query.type) {
        case '0':
            await authorizeSpotify(req);
            break;
        default:
            break; 
    }
}

module.exports = authorize;