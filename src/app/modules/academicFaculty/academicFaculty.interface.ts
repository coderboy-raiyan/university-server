/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import ApiError from '../../errors/ApiError';

export type TAcademicFaculty = {
    name: string;
};

export type TAcademicFacultyModel = Model<TAcademicFaculty> & {
    isAcademicFacultyAlreadyExists(payload: TAcademicFaculty): Promise<ApiError | void>;
};
