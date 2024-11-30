import mongoose from 'mongoose';
import { TeacherDocument } from './teacherModel';
import { StudentDocument } from './studentModel';
import { ParentOrgDocument } from './parentOrgModel';

export interface ClassroomInput {
    name: string;
    parentOrg: ParentOrgDocument['_id'];
    teacher: TeacherDocument['_id'];
    students: StudentDocument['_id'];
}

export interface ClassroomDocument extends ClassroomInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const classroomSchema = new mongoose.Schema({
    name: { type: String, required: true },
    parentOrg: { type: mongoose.Schema.Types.ObjectId, ref: 'ParentOrg' },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
}, {
    timestamps: true,
});

const ClassroomModel = mongoose.model<ClassroomDocument>('Classroom', classroomSchema);

export default ClassroomModel;