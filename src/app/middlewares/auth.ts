import httpStatus from 'http-status';
import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '../config';
import ApiError from '../errors/ApiError';
import catchAsync from '../utils/catchAsync';

const auth = catchAsync(async (req, res, next) => {
    const token = req?.headers?.authorization?.split('Bearer ')[1];

    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    verify(token, config.JWT_ACCESS_TOKEN_SECRET, function (err, decoded: JwtPayload) {
        if (err) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        req.user = decoded;
    });

    next();
});

export default auth;
