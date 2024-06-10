import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateJwtToken';
import User from '../user/user.model';
import { TChangePasswordPayload, TLoginUser } from './auth.interface';

const loginUser = async (payload: TLoginUser) => {
    // if user exists
    const user = await User.isUserExistsByCustomId(payload.id);

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
    }
    if (user.isDeleted) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This user is deleted!');
    }
    if (user.status === 'blocked') {
        throw new ApiError(httpStatus.FORBIDDEN, 'This user is blocked!');
    }

    const jwtPayload = {
        id: user.id,
        role: user.role,
    };

    const accessToken = generateAccessToken(jwtPayload);

    const refreshToken = generateRefreshToken(jwtPayload);

    // check password
    const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid user credentials');
    }
    return {
        accessToken,
        refreshToken,
        needsPasswordChange: user.needsPasswordChange,
    };
};

const changePasswordInToDB = async (payload: TChangePasswordPayload) => {
    const { id, role, newPassword, oldPassword, password } = payload;

    // check password
    const isPasswordMatched = await User.isPasswordMatched(oldPassword, password);
    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Old password did not matched');
    }

    const newHashedPassword = await bcrypt.hash(newPassword, parseInt(config.BCRYPT_SALT_ROUNDS));

    const result = await User.findOneAndUpdate(
        { id, role },
        { password: newHashedPassword, needsPasswordChange: false, passwordChangedAt: new Date() }
    );

    return { id: result.id, role: result.role };
};

const refreshToken = async (token: string) => {
    if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
    }

    const decoded = verify(token, config.JWT_REFRESH_SECRET) as JwtPayload;

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

    const jwtPayload = {
        id: user.id,
        role: user.role,
    };

    const accessToken = generateAccessToken(jwtPayload);

    return { accessToken };
};

const AuthServices = {
    loginUser,
    changePasswordInToDB,
    refreshToken,
};

export default AuthServices;
