import { Request, Response } from 'express';
const Teacher = require('../models/Teacher');
const bcrypt = require('bcrypt');

// @desc Get teacher
// route GET /teachers
// @access Private
const getAllTeachers = async (req: Request, res: Response) => {
    const teachers = await Teacher.find().select('-password').lean();

    if (!teachers?.length) {
        return res.status(400).json({ message: 'No teachers found' });
    }
    res.json(teachers);
};

const createNewTeacher = async (req: Request, res: Response) => {
    const { email, password, firstName } = req.body;

    // confirm the data
    if (!email || !password || !firstName) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // check if the email already exists
    const duplicate = await Teacher.findOne({ email }).collation({ locale: 'en', strength: 2}).lean().exec();

    if (duplicate) {
        return res.status(400).json({ message: 'That email already exists.' });
    }

    // hash the password
    const hashedPwd = await bcrypt.hash(password, 10)

    const teacherObject = {
        "email": email,
        "password": hashedPwd,
        "firstName": firstName
    }

    // create and store the teacher
    const teacher = await Teacher.create(teacherObject);

    if (teacher) {
        res.status(201).json({ message: `New teacher ${email} created`});
    } else {
        res.status(400).json({ message: 'Invalid user data received'});
    }
};

// @desc Update a teacher
// @route PATCH /teachers
// @access Private
const updateTeacher = async (req: Request, res: Response) => {
    const { id, isActive, password } = req.body;

    // confirm the data
    if (!id || typeof isActive !== 'boolean') {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const teacher = await Teacher.findById(id).exec();

    if (!teacher) {
        return res.status(400).json({ message: 'User not found' });
    }

    teacher.isActive = isActive;
    
    if (password) {
        // hash password
        teacher.password = await bcrypt.hash(password, 10)
    }

    const updatedTeacher = await teacher.save();

    res.json({ message: `${updatedTeacher.email} updated`});    
};

// @desc Delete a teacher
// @route DELETE /teachers
// @access Private
const deleteTeacher = async (req: Request, res: Response) => {
    const { id } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Teacher ID required' });
    }

    const teacher = await Teacher.findById(id).exec();

    if (!teacher) {
        return res.status(400).json({ message: 'Teacher not found' });
    }

    const result = await teacher.deleteOne();
    
    const reply = `Teacher with ${result.email} has been deleted`;

    res.json(reply);
};

module.exports = {
    createNewTeacher,
    updateTeacher,
    deleteTeacher,
    getAllTeachers
}