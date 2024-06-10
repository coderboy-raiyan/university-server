import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string(),
        password: z.string(),
    }),
});
const changePasswordValidationSchema = z.object({
    body: z.object({
        oldPassword: z.string({ required_error: 'Old password is required!' }),
        newPassword: z.string(),
    }),
});

const AuthValidations = {
    loginValidationSchema,
    changePasswordValidationSchema,
};

export default AuthValidations;
