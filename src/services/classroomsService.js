const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'classroomsService' });
const Teacher = require('../models/teacherModel');
const Classroom = require('../models/classroomModel');
const helper = require('../utils/helper');

// returns an array of classroomModels
async function getClassroomsByTeacherId(teacherid) {
    try {
        const teacher = await Teacher.findById(teacherid);
        const { classrooms } = teacher;

        if (helper.isNullOrUndefined(classrooms) || classrooms.length === 0)
            throw ({ message: 'No classrooms exist for this teacher.'} );

        logger.debug('classrooms for the teacher');
        logger.debug(classrooms);

        const promises = classrooms.map(async classroomid => {
            return await Classroom.findById(classroomid);
        });

        const result = await Promise.all(promises);

        return result;
    } catch (e) {
        logger.error(e);
        throw (e);
    }
};

// create a new classroom
async function addClassroom(data) {
    try {
        const { name, teacher } = data;

        // TODO - clean this up
        let students;
        let lessonPlans;
        
        const classroom = await Classroom.create({
            name, 
            teacher,
            students,
            lessonPlans
        });

        logger.debug(classroom);

        // assign classroom to teacher
        await assignClassroomToTeacher(classroom._id, classroom.teacher);

        return classroom;
    } catch (err) {
        logger.error(err);
        throw (err);
    }
};

async function assignClassroomToTeacher(classroomid, teacherid) {
    try {
        // get the teacher

        logger.debug('Attempting to assign the classroom');
        logger.debug(teacherid);

        const teacher = await Teacher.findById(teacherid);

        logger.debug('this is the teacher');
        logger.debug(teacher);

        if (!teacher) {
            throw ({ message: 'Teacher does not exist' });
        }

        teacher.classrooms.push(classroomid);

        await teacher.save();

    } catch (err) {
        logger.error(err);
        throw (err);
    }
};

async function updateClassroomById(data) {
    try {
        // get the classroom
        const _id = data.params?.id;
        const { name, teacher, students, lessonPlans } = data.body;

        const classroom = await Classroom.findById(_id);

        if (!classroom) {
            throw ({ message: 'Classroom does not exist' });
        }

        classroom.name = name;
        classroom.teacher = teacher;
        classroom.students = students;
        classroom.lessonPlans = lessonPlans;

        await classroom.save();

        return classroom;
    } catch (err) {
        logger.error(err);
        throw (err);
    }
};

async function deleteClassroomById(id) {
    try {   
        const classroom = await Classroom.findById(id);

        console.log(classroom);

        if (!classroom) {
            throw ({ message: 'Classroom does not exist' });
        }

        await Classroom.deleteOne({_id: id});

        return { _id: id, deleted: true };
    } catch (err) {
        logger.error(err);
        throw (err);
    }
};

async function getAllClassrooms(data) {
    try {
        // TODO - flesh this out

        // return all classrooms for the organization
    } catch (err) {
        logger.error(err);
        throw (err);
    }
};

module.exports = {
    getClassroomsByTeacherId,
    addClassroom,
    updateClassroomById,
    deleteClassroomById,
    getAllClassrooms
};