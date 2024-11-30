import mongoose from 'mongoose';
import { TeacherDocument } from './teacherModel';
import { StudentDocument } from './studentModel';
import { ClassroomDocument } from './classroomModel';

export interface ParentOrgInput {
    name: string;
    location: string;
    teachers: TeacherDocument['_id'];
    students: StudentDocument['_id'];
    classrooms: ClassroomDocument['_id'];
}

export interface ParentOrgDocument extends ParentOrgInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const parentOrgSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String },
    teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
    classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }]
}, {
    timestamps: true,
});

const ParentOrgModel = mongoose.model<ParentOrgDocument>('ParentOrg', parentOrgSchema);

export default ParentOrgModel;