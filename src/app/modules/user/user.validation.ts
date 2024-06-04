import { z } from 'zod';
import StudentValidations from '../student/student.validation';

// Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character
export const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
);

const createUserAndStudentValidationSchema = z.object({
    body: z.object({
        password: z
            .string()
            .min(1, { message: 'Must have at least 1 character' })
            .regex(passwordValidation, {
                message:
                    'Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
            })
            .optional(),
        student: StudentValidations.createStudentValidationSchema,
    }),
});

const UserValidations = {
    createUserAndStudentValidationSchema,
};

export default UserValidations;
