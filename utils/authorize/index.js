const authorizeSpotify = require('./spotify');

const authorize = async (req) => {
    switch (req.query.type) {
        case '0':
            await authorizeSpotify(req, req.body);
            break;
        default:
            break; 
    }
}

module.exports = authorize;