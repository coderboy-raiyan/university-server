/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';
import ApiError from '../../errors/ApiError';

export type TAcademicDepartment = {
    name: string;
    academicFaculty: Types.ObjectId;
};

export type TAcademicDepartmentModel = Model<TAcademicDepartment> & {
    isDepartmentAlreadyExists(payload: TAcademicDepartment): Promise<ApiError | void>;
};
