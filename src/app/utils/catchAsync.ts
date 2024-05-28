import { NextFunction, Request, RequestHandler, Response } from 'express';

function catchAsync(fn: RequestHandler) {
    return function (req: Request, res: Response, next: NextFunction) {
        Promise.resolve(fn(req, res, next)).catch((error) => next(error));
    };
}

export default catchAsync;
