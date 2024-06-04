import { z } from 'zod';
import { passwordValidation } from '../user/user.validation';
import FacultyConstants from './faculty.constant';

const createFacultyNameValidationSchema = z.object({
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    middleName: z.string().max(30).optional(),
});
const updateFacultyNameValidationSchema = z.object({
    firstName: z.string().max(30).optional(),
    lastName: z.string().max(30).optional(),
    middleName: z.string().max(30).optional(),
});

const createFacultyValidationSchema = z.object({
    body: z.object({
        password: z
            .string()
            .min(1, { message: 'Must have at least 1 character' })
            .regex(passwordValidation, {
                message:
                    'Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
            })
            .optional(),
        faculty: z.object({
            name: createFacultyNameValidationSchema,
            email: z.string().email(),
            gender: z.enum(FacultyConstants.Gender),
            dateOfBirth: z.string().date(),
            designation: z.string(),
            academicFaculty: z.string(),
            academicDepartment: z.string(),
            emergencyContactNo: z.string(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            profileImg: z.string().optional(),
        }),
    }),
});
const updateFacultyValidationSchema = z.object({
    body: z.object({
        name: updateFacultyNameValidationSchema.optional(),
        email: z.string().email().optional(),
        gender: z.enum(FacultyConstants.Gender).optional(),
        dateOfBirth: z.string().date().optional(),
        designation: z.string().optional(),
        academicFaculty: z.string().optional(),
        academicDepartment: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

const FacultyValidations = {
    createFacultyValidationSchema,
    updateFacultyValidationSchema,
};

export default FacultyValidations;
