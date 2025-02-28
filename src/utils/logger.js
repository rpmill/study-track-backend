const winston = require('winston');
const { combine, timestamp, json, errors, align, printf } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        errors({ stack: true }),
        timestamp({format: 'YYYY-MM-DD hh:mm:ss.SSS'}),
        json(),
    ),
    transports: [
        new winston.transports.Console({
            handleExceptions: true,
            handleRejections: true,
            humanReadableUnhandledException: true,
            stderrLevels: ['error'],
        })
    ],
    //exitOnError:false,
});

module.exports = { logger };