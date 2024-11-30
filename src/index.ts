import express, { Express } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import connect from './db/connect';
import path from 'path';
import { router } from './routes/router';
import { baseRouter } from './routes/root';

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

        console.log('======================================================');
        console.log(`[server]: Server is running at http://localhost:${port}`);
        console.log('======================================================');

    } catch (err) {
        console.log('Error starting server: ', err);
    }    
});

mongoose.connection.once('open', () => {
    console.log(`[server]: Connected to MongoDB`);
});

mongoose.connection.on('error', (err: Error) => {
    console.log(err);
});