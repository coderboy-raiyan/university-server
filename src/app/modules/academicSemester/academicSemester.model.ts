import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../errors/ApiError';
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

academicSemesterSchema.pre('save', async function (next) {
    const isSemesterExists = await AcademicSemester.findOne({ year: this.year, name: this.name });
    if (isSemesterExists) {
        throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            `Semester '${this.name}' already exists in '${this.year}'`
        );
    }
    next();
});

const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);

export default AcademicSemester;
