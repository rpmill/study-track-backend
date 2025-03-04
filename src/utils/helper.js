const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'helper' });

function isNullOrUndefined(value) {
    try {
        if (value == null) {
            return true;
        }

        return false;
    } catch (err) {
        logger.error(err);
    }
};

module.exports = {
    isNullOrUndefined
};