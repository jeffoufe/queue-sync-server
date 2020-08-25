const selectDeviceSpotify = require('./spotify');

const selectDevice = async (req) => {
    switch (req.query.type) {
        case '0':
            await selectDeviceSpotify(req);
            break;
        default:
            break; 
    }
}

module.exports = selectDevice;