/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TAcademicFaculty = {
    name: string;
};

export type TAcademicFacultyModel = Model<TAcademicFaculty> & {
    isAcademicFacultyAlreadyExists(
        payload: Partial<TAcademicFaculty> | { _id: string }
    ): Promise<TAcademicFaculty>;
};
