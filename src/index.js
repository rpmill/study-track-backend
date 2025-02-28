require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const connect = require('./db/connect');
const path = require('path');
const router = require('./routes/router');
const baseRouter = require('./routes/root');

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

        console.log('=======================================================');
        console.log(`[server]: Server is running at http://localhost:${port}`);
        console.log('=======================================================');
    } catch (err) {
        console.log('Error starting server: ', err);
    }
});

mongoose.connection.once('open', () => {
    console.log(`[server]: Connected to MongoDB`);
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});