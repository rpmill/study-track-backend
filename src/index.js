require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connect = require('./db/connect');
const path = require('path');
const router = require('./routes/router');
const baseRouter = require('./routes/root');
const parentLogger = require('./utils/logger');
const logger = parentLogger.logger.child({ location: 'index' });

const app = express();

const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// routes
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', baseRouter);

app.use('/api/v1', router);

app.listen(port, async() => {
    try {
        await connect();

        logger.info('=======================================================');
        logger.info(`[server]: Server is running at http://localhost:${port}`);
        logger.info('=======================================================');
    } catch (err) {
        logger.error(`Error starting server: ${err}`);
    }
});

mongoose.connection.once('open', () => {
    logger.info(`[server]: Connected to MongoDB`);
});

mongoose.connection.on('error', (err) => {
    logger.error(err);
});