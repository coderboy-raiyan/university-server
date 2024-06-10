import httpStatus from 'http-status';
import { config } from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthServices from './auth.service';

const loginUser = catchAsync(async (req, res) => {
    const { accessToken, needsPasswordChange, refreshToken } = await AuthServices.loginUser(
        req.body
    );
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 15 * 24 * 60 * 60 * 1000,
        secure: config.NODE_ENV === 'production',
    });
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Logged in successfully',
        data: { accessToken, needsPasswordChange },
    });
});
const changePassword = catchAsync(async (req, res) => {
    const result = await AuthServices.changePasswordInToDB({ ...req.body, ...req.user });

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Password changed successfully',
        data: result,
    });
});

const AuthControllers = {
    loginUser,
    changePassword,
};

export default AuthControllers;
