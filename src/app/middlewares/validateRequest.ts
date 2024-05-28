/* eslint-disable @typescript-eslint/no-unused-vars */
import { AnyZodObject } from 'zod';
import catchAsync from '../utils/catchAsync';

function validateRequest(zodSchema: AnyZodObject) {
    return catchAsync(async (req, res, next) => {
        await zodSchema.parseAsync({
            body: req.body,
        });
        next();
    });
}

export default validateRequest;
