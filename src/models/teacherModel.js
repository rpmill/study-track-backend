const mongoose = require("mongoose");
const { ADMIN, TEACHER } = require('../config/roles');

const TeacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true},
    role: { type: String, enum: [ADMIN, TEACHER], default: TEACHER},
    organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Classroom" }]
  });

  // hash password before saving
  TeacherSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
      return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  });

  // compare password for login
  TeacherSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  }
  
module.exports = mongoose.model("Teacher", TeacherSchema);
  