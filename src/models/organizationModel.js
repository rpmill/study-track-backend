const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }],
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }]
});

module.exports = mongoose.model("Organization", OrganizationSchema);
