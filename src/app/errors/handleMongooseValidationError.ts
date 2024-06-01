import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

function handleMongooseValidationError(
    error: mongoose.Error.ValidationError
): TGenericErrorResponse {
    const errorSources: TErrorSources = Object.values(error.errors).map((err) => {
        return {
            path: err.path,
            message: err.message,
        };
    });
    return {
        statusCode: httpStatus.NOT_ACCEPTABLE,
        message: 'Validation Error',
        errorSources,
    };
}

export default handleMongooseValidationError;
