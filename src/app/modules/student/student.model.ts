import mongoose from 'mongoose';
import { Guardian, LocalGuardian, Student, UserName } from './student.interface';

const localGuardianSchema = new mongoose.Schema<LocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const studentUserNameSchema = new mongoose.Schema<UserName>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
});
const guardianSchema = new mongoose.Schema<Guardian>({
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
    },
    motherOccupation: {
        type: String,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const studentSchema = new mongoose.Schema<Student>({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
    },
    name: {
        type: studentUserNameSchema,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female'],
            message: '{VALUE} is not valid. Gender must be male or female',
        },
    },
    dateOfBirth: {
        type: String,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    emergencyContactNo: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
        },
        required: true,
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: {
        type: guardianSchema,
        required: true,
    },
    localGuardian: {
        type: localGuardianSchema,
        required: true,
    },
    profileImg: {
        type: String,
    },
    isActive: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
});

const StudentModel = mongoose.model<Student>('Student', studentSchema);

export default StudentModel;
