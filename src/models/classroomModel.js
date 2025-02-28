const mongoose = require('mongoose');

const ClassroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
    lessonPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "LessonPlan" }]
});

module.exports = mongoose.model("Classroom", ClassroomSchema);