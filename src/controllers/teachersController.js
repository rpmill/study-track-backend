const parentLogger = require('../utils/logger');
const logger = parentLogger.logger.child({ location: 'teachersController' });

async function addStudentHandler(req, res) {

};

async function addLessonPlanHandler(req, res) {

};

module.exports = {
    addClassroomHandler,
    addStudentHandler,
    addLessonPlanHandler
}