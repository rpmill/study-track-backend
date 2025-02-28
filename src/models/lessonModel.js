const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    order: { type: Number, required: true } // Helps maintain lesson order
  });
  
module.exports = mongoose.model("Lesson", LessonSchema);
  