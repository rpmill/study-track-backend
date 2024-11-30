import mongoose from 'mongoose';
import { LessonPlanDocument } from './lessonPlanModel';

export interface LessonInput {
    title: string;
    description: string;
    content: string;
    order: number;
    lessonPlan: LessonPlanDocument['_id'];
    isComplete: boolean;
    completedAt: Date;
}

export interface LessonDocument extends LessonInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    content: { type: String },
    order: { type: Number, required: true },
    lessonPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'LessonPlan' },
    isComplete: { type: Boolean, required: true, default: false },
    completedAt: { type: Date },
}, {
    timestamps: true,
});

const LessonModel = mongoose.model<LessonDocument>('Lesson', lessonSchema);

export default LessonModel;