import mongoose from 'mongoose';
import { ClassroomDocument } from './classroomModel';
import { ParentOrgDocument } from './parentOrgModel';
import { CustomizedLessonDocument } from './customizedLessonModel';
import LessonPlanModel, { LessonPlanDocument } from './lessonPlanModel';

export interface StudentInput {
    name: string;
    userName: string;
    email: string;
    password: string;
    parentOrg: ParentOrgDocument['_id'];
    classrooms: ClassroomDocument['_id'];
    lessonPlans: LessonPlanDocument;
    customizedLessons: CustomizedLessonDocument['_id'];
}

export interface StudentDocument extends StudentInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    parentOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'ParentOrg' },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    lessonPlans: [{ type: LessonPlanModel }],
    customizedLessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CustomizedLesson' }]
}, {
    timestamps: true,
});

const StudentModel = mongoose.model<StudentDocument>('Student', studentSchema);

export default StudentModel;