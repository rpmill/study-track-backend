const { Router } = require('express');
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'router' });
const authRoutes = require('./auth');

const router = Router();

// authentication
router.route('/auth', authRoutes);

// teachers
router.route('/teachers')
    .get((req, res) => {
        res.status(200).send({ message: 'All good!' });
    })

router.route('/teachers/:teacherId')
    .get((req, res) => {
        res.status(200).send({ message: 'You made it here!' });
    })

// students

// classrooms

// lessonPlans

// lessons

// parentOrgs

module.exports = router;