import { z } from 'zod';
import { passwordValidation } from '../user/user.validation';
import AdminConstants from './admin.constant';

const createAdminNameValidationSchema = z.object({
    firstName: z.string().max(30),
    lastName: z.string().max(30),
    middleName: z.string().max(30).optional(),
});
const updateAdminNameValidationSchema = z.object({
    firstName: z.string().max(30).optional(),
    lastName: z.string().max(30).optional(),
    middleName: z.string().max(30).optional(),
});

const createAdminValidationSchema = z.object({
    body: z.object({
        password: z
            .string()
            .min(1, { message: 'Must have at least 1 character' })
            .regex(passwordValidation, {
                message:
                    'Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
            })
            .optional(),
        admin: z.object({
            name: createAdminNameValidationSchema,
            email: z.string().email(),
            gender: z.enum(AdminConstants.Gender),
            dateOfBirth: z.string().date(),
            managementDepartment: z.string(),
            presentAddress: z.string(),
            permanentAddress: z.string(),
            profileImg: z.string().optional(),
        }),
    }),
});
const updateAdminValidationSchema = z.object({
    body: z.object({
        name: updateAdminNameValidationSchema.optional(),
        email: z.string().email().optional(),
        gender: z.enum(AdminConstants.Gender).optional(),
        dateOfBirth: z.string().date().optional(),
        managementDepartment: z.string().optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profileImg: z.string().optional(),
    }),
});

const AdminValidations = {
    createAdminValidationSchema,
    updateAdminValidationSchema,
};

export default AdminValidations;
