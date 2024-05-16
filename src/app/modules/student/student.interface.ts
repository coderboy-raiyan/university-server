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
    name: UserName;
    email: string;
    avatar?: string;
    id: string;
    gender: 'male' | 'female';
    dateOfBirth: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    profileImg?: string;
    isActive: 'active' | 'blocked';
};
