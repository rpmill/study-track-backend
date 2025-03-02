const { Router } = require('express');
const authController = require('../controllers/authController');
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'auth' });


const router = Router();

router.route('/register')
    .post(authController.registerHandler);

// router.route('/register')
//     .post(authController.registerHandler);
//router.post('/register', authController.registerHandler);

router.route('/login')
    .post(authController.loginHandler);

router.route('/logout')

module.exports = router;