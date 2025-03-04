const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'classroomsController' });
const Teacher = require('../models/teacherModel');
const Classroom = require('../models/classroomModel');
const classroomsService = require('../services/classroomsService');

async function addClassroomHandler(req, res) {
    try {
        // get the teacher id
        const { teacher } = req.body;

        // validate it's a real teacher
        const _teacher = await Teacher.findById(teacher);

        logger.debug(_teacher);

        if (!_teacher) {
            res.status(404).json({ message: 'Teacher not found' });
        }

        // call the service to create the new classroom
        const classroom =  await classroomsService.addClassroom(req.body);

        res.status(201).json(classroom);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err.message });
    }
};

async function getAllClassroomsHandler(req, res) {
    try {
        const classrooms = await classroomsService.getAllClassrooms(req)

        res.status(200).json(classrooms);
    } catch (err) {
        logger.error(err);
    }
};

async function getClassroomsHandler(req, res) {
    try {
        // validate the teacher
        // TODO - refactor to call the service here
        const teacher = Teacher.findOne({ _id: req.params.teacherid });

        if (!teacher) 
            return res.status(404).json({ message: 'Teacher not found' });

        const classrooms =  await classroomsService.getClassroomsByTeacherId(req.user._id);

        res.status(200).json(classrooms);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err.message });
    }
};

async function updateClassroomHandler(req, res) {
    try {
        const classroom = await classroomsService.updateClassroomById(req);

        res.status(200).json(classroom);
    } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err.message });
    }
};

async function deleteClassroomHandler(req, res) {
    try {
        console.log('we made it to the delete');
        
        const classroom = await classroomsService.deleteClassroomById(req.params?.id);

        res.status(200).json(classroom);
    } catch (err) {
        logger.error(err);
    }
};

module.exports = {
    addClassroomHandler,
    getClassroomsHandler,
    getAllClassroomsHandler,
    updateClassroomHandler,
    deleteClassroomHandler
}