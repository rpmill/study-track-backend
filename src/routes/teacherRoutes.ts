import express from 'express';
const teachersController = require('../controllers/teachersController');

const router = express.Router();

router.route('/')
    .get(teachersController.getAllTeachers)
    .post(teachersController.createNewTeacher)
    .patch(teachersController.updateTeacher)
    .delete(teachersController.deleteTeacher);

module.exports = router;