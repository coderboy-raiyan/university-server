import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

function handleMongooseCastError(error: mongoose.Error.CastError): TGenericErrorResponse {
    const errorSources: TErrorSources = [
        {
            path: error.path,
            message: error.message,
        },
    ];
    return {
        statusCode: httpStatus.INTERNAL_SERVER_ERROR,
        message: 'Validation Error',
        errorSources,
    };
}

export default handleMongooseCastError;
