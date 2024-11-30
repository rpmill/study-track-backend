import mongoose from 'mongoose';
import { TeacherDocument } from './teacherModel';
import { LessonDocument } from './lessonModel';

export interface LessonPlanInput {
    subject: string;
    term: string;
    teacher: TeacherDocument['_id'];
    lessons: LessonDocument['_id'];
}

export interface LessonPlanDocument extends LessonPlanInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const lessonPlanSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    term: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }]
}, {
    timestamps: true,
});

const LessonPlanModel = mongoose.model<LessonPlanDocument>('LessonPlan', lessonPlanSchema);

export default LessonPlanModel;