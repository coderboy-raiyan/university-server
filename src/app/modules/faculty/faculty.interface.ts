import { Types } from 'mongoose';

export type TFacultyName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    name: TFacultyName;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    designation: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    profileImg?: string;
    isDeleted?: boolean;
};
