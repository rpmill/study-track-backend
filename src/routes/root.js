const { Router } = require('express');
const path = require('path');
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'root' });

const baseRouter = Router();

baseRouter.get('^/$|/index(.html)?', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = baseRouter;