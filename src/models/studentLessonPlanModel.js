const mongoose = require('mongoose');

const StudentLessonPlanSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
    originalLessonPlan: { type: mongoose.Schema.Types.ObjectId, ref: "LessonPlan" }, // Reference to the template
    lessons: [{
      lesson: { type: mongoose.Schema.Types.ObjectId, ref: "Lesson" },
      completed: { type: Boolean, default: false },
      customContent: String // Allows customization without affecting the original lesson
    }]
  });
  
module.exports = mongoose.model("StudentLessonPlan", StudentLessonPlanSchema);
  