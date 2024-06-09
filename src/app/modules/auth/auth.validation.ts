import { z } from 'zod';

const loginValidationSchema = z.object({
    body: z.object({
        id: z.string(),
        password: z.string(),
    }),
});

const AuthValidations = {
    loginValidationSchema,
};

export default AuthValidations;
