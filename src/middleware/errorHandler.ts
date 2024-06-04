import { NextFunction, Request, Response } from 'express';
const { logEvents } = require('./logger');

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    logEvents(`${err.name}: ${err.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');
    console.log(err.stack);

    const status = res.status ? res.status : 500 // server error

    const data = {
        message: err.message,
        isError: true
    }

    res.json(data);
}

module.exports = errorHandler;