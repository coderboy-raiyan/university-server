import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

function handleZodError(zodError: ZodError): TGenericErrorResponse {
    const error: TErrorSources = zodError.issues.map((err) => {
        return {
            path: err.path[err.path.length - 1],
            message: err.message,
        };
    });

    return {
        statusCode: httpStatus.NOT_ACCEPTABLE,
        message: 'Validation error',
        errorSources: error,
    };
}

export default handleZodError;
