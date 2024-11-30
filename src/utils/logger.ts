import winston from 'winston';

const {
    combine,
    timestamp,
    json,
    colorize,
    align,
    printf,
    errors
} = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        colorize({ all: true}),
        timestamp(),
        align(),
        errors({
            stack: true
        }),
        printf((info) => `[${info.timestamp}] [${info.level}]: ${info.message} ${info.stack ? info.stack : ''}`)
    ),
    transports: [new winston.transports.Console()],
    exceptionHandlers: [
        new winston.transports.Console(),
    ],
    rejectionHandlers: [
        new winston.transports.Console(),
    ]
});

export default logger;