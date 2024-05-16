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
    },
    lastName: {
        type: String,
        required: true,
    },
    middleName: {
        type: String,
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
    },
    avatar: {
        type: String,
    },
    name: studentUserNameSchema,
    email: {
        type: String,
        required: true,
    },
    gender: {
        enum: ['male', 'female'],
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
        enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: {
        type: String,
        required: true,
    },
    permanentAddress: {
        type: String,
        required: true,
    },
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImg: {
        type: String,
    },
    isActive: {
        enum: ['active', 'block'],
    },
});

const Student = mongoose.model<Student>('Student', studentSchema);

export default Student;
