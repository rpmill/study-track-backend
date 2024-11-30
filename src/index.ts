import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connect from './db/connect';
import path from 'path';
import { router } from './routes/router';
import { baseRouter } from './routes/root';
import logger from './utils/logger';

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 4000;

// middleware
app.use(express.json());

// routes
app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', baseRouter);

app.use('/api/v1', router);

app.listen(port, async () => {
    try {
        await connect();

        logger.info('======================================================');
        logger.info(`[server]: Server is running at http://localhost:${port}`);
        logger.info('======================================================');

    } catch (err) {
        logger.error('Error starting server: ', err);
    }    
});

mongoose.connection.once('open', () => {
    logger.info(`[server]: Connected to MongoDB`);
});

mongoose.connection.on('error', (err: Error) => {
    logger.error(err);
});