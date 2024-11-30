import mongoose from 'mongoose';
import { ClassroomDocument } from './classroomModel';
import { LessonPlanDocument } from './lessonPlanModel';
import { ParentOrgDocument } from './parentOrgModel';

export interface TeacherInput {
    name: string;
    userName: string;
    email: string;
    password: string;
    parentOrg: ParentOrgDocument['_id'];
    classrooms: ClassroomDocument['_id'];
    lessonPlans: LessonPlanDocument['_id'];
}

export interface TeacherDocument extends TeacherInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    parentOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'ParentOrg' },
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }],
    lessonPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LessonPlan' }],
}, {
    timestamps: true,
})

const TeacherModel = mongoose.model<TeacherDocument>("Teacher", teacherSchema);

export default TeacherModel;