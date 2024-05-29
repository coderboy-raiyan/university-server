/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TAcademicDepartment = {
    name: string;
    academicFaculty: Types.ObjectId | string;
};

export type TAcademicDepartmentModel = Model<TAcademicDepartment> & {
    isDepartmentAlreadyExists(
        payload: Partial<TAcademicDepartment> | { _id: string }
    ): Promise<TAcademicDepartment | null>;
};
