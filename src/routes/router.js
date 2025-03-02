const { Router } = require('express');
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'router' });
const authRoutes = require('./auth');
const { protect, isAdmin } = require('../middleware/authMiddleware');

const router = Router();

// authentication
router.use('/auth', authRoutes);
// router.route('/auth/register')
//     .post((req, res) => {
//         logger.info(req.body);
//         res.sendStatus(200);
//     })

// teachers
router.route('/teachers')
    .get(protect, (req, res) => {
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