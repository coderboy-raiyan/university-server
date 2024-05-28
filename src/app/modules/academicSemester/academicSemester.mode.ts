import { Schema, model } from 'mongoose';
import AcademicSemesterConstant from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            enum: AcademicSemesterConstant.SemesterName,
            required: true,
        },
        code: {
            type: String,
            enum: AcademicSemesterConstant.SemesterCode,
            required: true,
        },
        year: {
            type: String,
            required: true,
        },
        startMonth: {
            type: String,
            enum: AcademicSemesterConstant.Months,
            required: true,
        },
        endMonth: {
            type: String,
            enum: AcademicSemesterConstant.Months,
            required: true,
        },
    },
    { timestamps: true }
);

const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemester;
