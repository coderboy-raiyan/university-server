import { Schema, model } from 'mongoose';
import AcademicSemesterConstant from './academicSemester.constant';
import { TAcademicModel, TAcademicSemester } from './academicSemester.interface';

const academicSemesterSchema = new Schema<TAcademicSemester, TAcademicModel>(
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

academicSemesterSchema.static(
    'isSemesterExistsInTheSameYear',
    async function (payload: TAcademicSemester) {
        const isSemesterExists = await AcademicSemester.findOne({
            year: payload.year,
            name: payload.name,
        });
        return isSemesterExists;
    }
);

const AcademicSemester = model<TAcademicSemester, TAcademicModel>(
    'AcademicSemester',
    academicSemesterSchema
);

export default AcademicSemester;
