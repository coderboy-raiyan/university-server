/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TAcademicDepartment = {
    name: string;
    academicFaculty: Types.ObjectId;
};

export type TAcademicDepartmentModel = Model<TAcademicDepartment> & {
    isDepartmentAlreadyExists(payload: TAcademicDepartment): TAcademicDepartment | null;
};
