import { Request, Response } from 'express';

const express = require('express');
const router = express.Router();
const path = require('path');

router.get('^/$|/index(.html)?', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;