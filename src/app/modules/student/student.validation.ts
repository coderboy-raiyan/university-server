import { z } from 'zod';
import StudentConstant from './student.constant';

const studentUserNameValidationSchema = z.object({
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    middleName: z.string().max(30).optional(),
});
const guardianValidationSchema = z.object({
    fatherName: z.string().max(30),
    motherName: z.string().max(30),
    fatherOccupation: z.string().max(30).optional(),
    motherOccupation: z.string().max(30).optional(),
    fatherContactNo: z.string().max(30),
    motherContactNo: z.string().max(30),
});
const localGuardianValidationSchema = z.object({
    name: z.string().max(70),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

const createStudentValidationSchema = z.object({
    name: studentUserNameValidationSchema,
    email: z.string().email(),
    gender: z.enum(StudentConstant.Gender),
    dateOfBirth: z.string().date(),
    admissionSemester: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianValidationSchema,
    localGuardian: localGuardianValidationSchema,
    profileImg: z.string().optional(),
});

const StudentValidation = {
    createStudentValidationSchema,
};

export default StudentValidation;
