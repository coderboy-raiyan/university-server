import { Schema, model } from 'mongoose';
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
    async function (payload: TAcademicDepartment) {
        const isExists = await this.findOne(payload);
        return isExists;
    }
);

const AcademicDepartment = model<TAcademicDepartment, TAcademicDepartmentModel>(
    'AcademicDepartment',
    academicDepartmentSchema
);

export default AcademicDepartment;
