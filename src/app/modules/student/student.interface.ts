import { Types } from 'mongoose';

export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};
export type Guardian = {
    fatherName: string;
    fatherOccupation?: string;
    fatherContactNo: string;
    motherContactNo: string;
    motherName: string;
    motherOccupation?: string;
};

export type LocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type Student = {
    id: string;
    user: Types.ObjectId;
    name: UserName;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isDeleted?: boolean;
};
