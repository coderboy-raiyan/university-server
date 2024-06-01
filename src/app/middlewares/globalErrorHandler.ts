/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { ZodError } from 'zod';
import { config } from '../config';
import ApiError from '../errors/ApiError';
import handleMongooseValidationError from '../errors/handleMongooseValidationError';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';

function globalErrorHandler(error: any, req: Request, res: Response, next: NextFunction) {
    let statusCode: number = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    let message: string = error.message || 'Something went wrong!';
    let errorSources: TErrorSources = [
        {
            path: '',
            message: error.message,
        },
    ];

    if (error instanceof ZodError) {
        const modifiedError = handleZodError(error);
        message = modifiedError.message;
        statusCode = modifiedError.statusCode;
        errorSources = modifiedError.errorSources;
    } else if (error?.name === 'ValidationError') {
        const modifiedError = handleMongooseValidationError(error);
        message = modifiedError.message;
        statusCode = modifiedError.statusCode;
        errorSources = modifiedError.errorSources;
    } else if (error instanceof ApiError) {
        statusCode = error.statusCode;
        message = error.message;
        errorSources = [
            {
                path: '',
                message: error.message,
            },
        ];
    }

    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === 'development' ? error.stack : null,
    });
}

export default globalErrorHandler;
