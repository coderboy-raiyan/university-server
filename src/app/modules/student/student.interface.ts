export type Guardian = {
    fatherName: string;
    fatherOccupation?: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation?: string;
};

export type Student = {
    name: {
        firstName: string;
        middleName: string;
        lastName: string;
    };
    email: string;
    avatar?: string;
    id: string;
    gender: 'Male' | 'Female';
    dateOfBirth: string;
    contactNumber: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';
    presentAddress: string;
    permanentAddress: string;
    guardian: Guardian;
};
