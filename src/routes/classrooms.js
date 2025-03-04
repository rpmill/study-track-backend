const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'classrooms' });
const { Router } = require('express');
const classroomsController = require('../controllers/classroomsController');
const { isAdminOrTeacher, isAdmin, isTeacher } = require('../middleware/authMiddleware');

const router = Router();

// get all classrooms in the organization
router.route('/', isAdmin)
    .get(classroomsController.getAllClassroomsHandler);

// get all classrooms for a specific teacher
router.route('/:teacherid')
    .get(classroomsController.getClassroomsHandler);

// create a new classroom
router.route('/')
    .post(classroomsController.addClassroomHandler);

// update an existing classroom
router.route('/:id')
    .put(classroomsController.updateClassroomHandler);

// delete a classroom
router.route('/:id')
    .delete(classroomsController.deleteClassroomHandler);



module.exports = router;