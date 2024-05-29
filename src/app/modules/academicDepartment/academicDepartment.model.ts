import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../errors/ApiError';
import { TAcademicDepartment, TAcademicDepartmentModel } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment, TAcademicDepartmentModel>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
        },
    },
    { timestamps: true }
);

academicDepartmentSchema.static(
    'isDepartmentAlreadyExists',
    async function ({ name }: TAcademicDepartment) {
        const isExists = await this.findOne({ name });
        return isExists;
    }
);

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isExists = await this.model.findOne(query);
    if (!isExists) {
        throw new ApiError(httpStatus.NOT_FOUND, `Department does not exists!`);
    }
    next();
});

const AcademicDepartment = model<TAcademicDepartment, TAcademicDepartmentModel>(
    'AcademicDepartment',
    academicDepartmentSchema
);

export default AcademicDepartment;
