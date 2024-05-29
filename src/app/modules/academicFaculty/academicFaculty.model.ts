import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../errors/ApiError';
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
    async function ({ name }: TAcademicFaculty) {
        const isExists = await this.findOne({ name });

        if (isExists) {
            throw new ApiError(httpStatus.NOT_ACCEPTABLE, `${name} faculty already exists!`);
        }
    }
);

academicFacultySchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isExists = await this.model.findOne(query);

    if (!isExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, `Faculty does not exists!`);
    }
    next();
});

const AcademicFaculty = model<TAcademicFaculty, TAcademicFacultyModel>(
    'AcademicFaculty',
    academicFacultySchema
);

export default AcademicFaculty;
