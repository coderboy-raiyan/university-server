import httpStatus from 'http-status';
import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '../config';
import ApiError from '../errors/ApiError';
import { TUserRole } from '../modules/user/user.interface';
import User from '../modules/user/user.model';
import catchAsync from '../utils/catchAsync';

const auth = (...requiredRoles: TUserRole[]) => {
    return catchAsync(async (req, res, next) => {
        const token = req?.headers?.authorization?.split('Bearer ')[1];

        if (!token) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        const decoded = verify(token, config.JWT_ACCESS_SECRET) as JwtPayload;

        const user = await User.isUserExistsByCustomId(decoded.id);

        if (!user) {
            throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
        }
        if (user.isDeleted) {
            throw new ApiError(httpStatus.NOT_FOUND, 'This user is deleted!');
        }
        if (user.status === 'blocked') {
            throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked!');
        }

        if (
            user.passwordChangedAt &&
            User.isJwtIssuedBeforePasswordChanged(user.passwordChangedAt, decoded.iat)
        ) {
            throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized');
        }

        if (requiredRoles.length && !requiredRoles.includes(decoded.role)) {
            throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
        }

        req.user = user.toObject();

        next();
    });
};

export default auth;
