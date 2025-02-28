const mongoose = require('mongoose');
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'connect' });

async function connect() {
    const dbUri = process.env.DATABASE_URI || '';

    try {
        await mongoose.connect(dbUri);
    } catch(e) {
        logger.error(e);
    }
}

module.exports = connect;