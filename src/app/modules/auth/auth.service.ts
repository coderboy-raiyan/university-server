import bcrypt from 'bcrypt';
import httpStatus from 'http-status';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import generateJwtToken from '../../utils/generateJwtToken';
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

    const accessToken = generateJwtToken(jwtPayload, config.JWT_ACCESS_TOKEN_SECRET);

    // check password
    const isPasswordMatched = await User.isPasswordMatched(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid user credentials');
    }
    return {
        accessToken,
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

const AuthServices = {
    loginUser,
    changePasswordInToDB,
};

export default AuthServices;
