import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';

function notFound(req: Request, res: Response, next: NextFunction) {
    next(new ApiError(httpStatus.NOT_FOUND, 'API not found'));
}

export default notFound;
