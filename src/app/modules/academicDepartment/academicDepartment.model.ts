import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
    },
});

const AcademicDepartment = model('AcademicDepartment', academicDepartmentSchema);

export default AcademicDepartment;
