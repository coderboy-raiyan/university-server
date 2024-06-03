import { Types } from 'mongoose';

export type TAdminName = {
    firstName: string;
    middleName?: string;
    lastName: string;
};

export type TAdmin = {
    id: string;
    user: Types.ObjectId;
    name: TAdminName;
    email: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    contactNo: string;
    emergencyContactNo: string;
    presentAddress: string;
    permanentAddress: string;
    managementDepartment: Types.ObjectId;
    profileImg?: string;
    isDeleted?: boolean;
};
