/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

function handleDuplicateError(error: any): TGenericErrorResponse {
    const errorSources: TErrorSources = [
        {
            path: Object.keys(error.keyValue)[0],
            message: `${Object.values(error.keyValue)[0]} is already exists`,
        },
    ];
    return {
        statusCode: httpStatus.NOT_ACCEPTABLE,
        message: 'Validation Error',
        errorSources,
    };
}

export default handleDuplicateError;
