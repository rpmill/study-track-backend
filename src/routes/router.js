const { Router } = require('express');
const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'router' });
const authRoutes = require('./auth');
const teacherRoutes = require('./teachers');
const classroomRoutes = require('./classrooms');
const { protect, isAdmin, isTeacher, isAdminOrTeacher } = require('../middleware/authMiddleware');

const router = Router();

// authentication
router.use('/auth', authRoutes);
// router.route('/auth/register')
//     .post((req, res) => {
//         logger.info(req.body);
//         res.sendStatus(200);
//     })

// teachers
router.route('/teachers', protect, teacherRoutes);

// students

// classrooms
router.route('/classrooms', protect, isAdminOrTeacher, classroomRoutes);

// lessonPlans

// lessons

// parentOrgs

module.exports = router;