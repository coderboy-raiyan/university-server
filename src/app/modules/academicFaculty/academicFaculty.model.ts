import { Schema, model } from 'mongoose';
import { TAcademicFaculty, TAcademicFacultyModel } from './academicFaculty.interface';

const academicFacultySchema = new Schema<TAcademicFaculty, TAcademicFacultyModel>(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
    },
    { timestamps: true }
);

academicFacultySchema.static(
    'isAcademicFacultyAlreadyExists',
    async function (payload: Partial<TAcademicFaculty> | { _id: string }) {
        const isExists = await this.findOne(payload);
        return isExists;
    }
);

const AcademicFaculty = model<TAcademicFaculty, TAcademicFacultyModel>(
    'AcademicFaculty',
    academicFacultySchema
);

export default AcademicFaculty;
