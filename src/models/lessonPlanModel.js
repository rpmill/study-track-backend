const mongoose = require('mongoose');

const LessonPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    subject: { type: String, required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }]
  });
  
module.exports = mongoose.model("LessonPlan", LessonPlanSchema);
  