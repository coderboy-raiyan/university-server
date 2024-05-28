import { z } from 'zod';

// Minimum 6 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/
);

const userValidationSchema = z.object({
    password: z
        .string()
        .min(1, { message: 'Must have at least 1 character' })
        .regex(passwordValidation, {
            message: 'Password provide a strong password',
        })
        .optional(),
});

const UserValidation = {
    userValidationSchema,
};

export default UserValidation;
