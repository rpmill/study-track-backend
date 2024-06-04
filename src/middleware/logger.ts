import { NextFunction, Request, Response } from "express";

const { format } = require('date-fns');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message: String, logFileName: String) => {
    const dateTime: Date = format(new Date(), 'yyyyMMdd\tHH:mm:ss');
    const logItem: String = `${dateTime}\t${uuidv4()}\t${message}\n`;

    try {
        if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, '..', 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, '..', 'logs', logFileName), logItem);
    } catch (err) {
        console.log(err);
    }
}

const logger = (req: Request, res: Response, next: NextFunction) => {
    // logs all requests received. may want to add conditionsl here, could fill very fast
    logEvents(`${req.method}\t${req.path}\t${req.headers.origin}`, 'reqLog.log');
    console.log(`${req.method} ${req.url}`);
    next();
}

module.exports = { logEvents, logger };