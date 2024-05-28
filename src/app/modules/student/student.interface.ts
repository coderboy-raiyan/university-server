import { Types } from 'mongoose';

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};
export type TGuardian = {
    fatherName: string;
    fatherOccupation?: string;
    fatherContactNo: string;
    motherContactNo: string;
    motherName: string;
    motherOccupation?: string;
};

export type TLocalGuardian = {
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
};

export type TStudent = {
    id: string;
    user: Types.ObjectId;
    name: TUserName;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    admissionSemester: Types.ObjectId;
    localGuardian: TLocalGuardian;
    profileImg?: string;
    isDeleted?: boolean;
};
