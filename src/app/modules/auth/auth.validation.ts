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
const refreshTokenValidationSchema = z.object({
    cookies: z.object({
        refreshToken: z.string({ required_error: 'Refresh token is required!' }),
    }),
});

const AuthValidations = {
    loginValidationSchema,
    changePasswordValidationSchema,
    refreshTokenValidationSchema,
};

export default AuthValidations;
