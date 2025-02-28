const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }]
  });
  
module.exports = mongoose.model("Teacher", TeacherSchema);
  