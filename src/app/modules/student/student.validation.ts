import { z } from 'zod';
import StudentConstant from './student.constant';

const createStudentUserNameValidationSchema = z.object({
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    middleName: z.string().max(30).optional(),
});
const createGuardianValidationSchema = z.object({
    fatherName: z.string().max(30),
    motherName: z.string().max(30),
    fatherOccupation: z.string().max(30).optional(),
    motherOccupation: z.string().max(30).optional(),
    fatherContactNo: z.string().max(30),
    motherContactNo: z.string().max(30),
});
const createLocalGuardianValidationSchema = z.object({
    name: z.string().max(70),
    occupation: z.string(),
    contactNo: z.string(),
    address: z.string(),
});

const createStudentValidationSchema = z.object({
    name: createStudentUserNameValidationSchema,
    email: z.string().email(),
    gender: z.enum(StudentConstant.Gender),
    dateOfBirth: z.string().date(),
    admissionSemester: z.string(),
    academicDepartment: z.string(),
    emergencyContactNo: z.string(),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: createGuardianValidationSchema,
    localGuardian: createLocalGuardianValidationSchema,
    profileImg: z.string().optional(),
});

const updateStudentUserNameValidationSchema = z.object({
    firstName: z.string().max(30).optional(),
    lastName: z.string().max(30).optional(),
    middleName: z.string().max(30).optional(),
});
const updateGuardianValidationSchema = z.object({
    fatherName: z.string().max(30).optional(),
    motherName: z.string().max(30).optional(),
    fatherOccupation: z.string().max(30).optional(),
    motherOccupation: z.string().max(30).optional(),
    fatherContactNo: z.string().max(30).optional(),
    motherContactNo: z.string().max(30).optional(),
});
const updateLocalGuardianValidationSchema = z.object({
    name: z.string().max(70).optional(),
    occupation: z.string().optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
    body: z.object({
        name: updateStudentUserNameValidationSchema.optional(),
        email: z.string().email().optional(),
        gender: z.enum(StudentConstant.Gender).optional(),
        dateOfBirth: z.string().date().optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: updateGuardianValidationSchema.optional(),
        localGuardian: updateLocalGuardianValidationSchema.optional(),
        profileImg: z.string().optional(),
    }),
});

const StudentValidation = {
    createStudentValidationSchema,
    updateStudentValidationSchema,
};

export default StudentValidation;
