const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    classroom: { type: mongoose.Schema.Types.ObjectId, ref: "Classroom" },
    assignedLessonPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentLessonPlan" }]
  });
  
module.exports = mongoose.model("Student", StudentSchema);
  