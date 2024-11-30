import mongoose from 'mongoose';
import { StudentDocument } from './studentModel';
import { LessonDocument } from './lessonModel';

export interface CustomizedLessonInput {
    student: StudentDocument['_id'];
    lesson: LessonDocument['_id'];
    customContent: string;
    customGrade: string;
    completedAt: Date;
}

export interface CustomizedLessonDocument extends CustomizedLessonInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const customizedLessonSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    lesson: { type: mongoose.Schema.Types.ObjectId, ref: 'Lesson', required: true },
    customContent: { type: String }, 
    customGrade: { type: String },
    completedAt: { type: Date }
}, {
    timestamps: true,
});