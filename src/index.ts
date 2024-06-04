require('dotenv').config();
require('express-async-errors');

import express, { Express, Request, Response } from 'express';
import { Error } from 'mongoose';



const app: Express = express();
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger, logEvents } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbConn');


const port = process.env.PORT || 4000;

connectDB();


// middleware
app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());


app.use('/', express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/root'));

app.all('*', (req: Request, res: Response) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found' });
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log(`[server]: Server is running at http://localhost:${port}`));
});

mongoose.connection.on('error', (err: Error) => {
    console.log(err);
    logEvents(`${err.message}`, 'mongoErrLog.log')
})

