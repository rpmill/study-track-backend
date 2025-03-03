const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'teachers' });
const { Router } = require('express');
const teachersController = require('../controllers/teachersController');

const router = Router();

// create a classroom
router.route('/')

module.exports = router;
