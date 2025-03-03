const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'classroomsController' });
const Teacher = require('../models/teacherModel');
const Classroom = require('../models/classroomModel');

async function addClassroomHandler(req, res) {
    try {

    } catch (err) {
        logger.error(err);
    }
};

async function getAllClassroomsHandler(req, res) {
    try {

    } catch (err) {
        logger.error(err);
    }
};

async function getClassroomsHandler(req, res) {
    try {
        // validate the teacher
        // refactor to call the service here
        const teacher = Teacher.findOne({ _id: req.params.teacherid });

        if (!teacher) 
            return res.status(403).json({ message: 'Teacher not found' });

        // get the classrooms array associated with the teacher
        let classrooms;

        teacher.classrooms.forEach((classroom) => {
            let _classroomId = classroom.id;
            console.log(_classroomId);

            // refactor to call the service here
            let _classroom = Classrooms.findOne({ _id: _classroomId });

            if (_classroom)
                classrooms.push(_classroom);
        });
    } catch (err) {
        logger.error(err);
    }
};

async function updateClassroomHandler(req, res) {
    try {

    } catch (err) {
        logger.error(err);
    }
};

async function deleteClassroomHandler(req, res) {
    try {

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