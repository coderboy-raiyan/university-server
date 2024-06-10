import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import AuthServices from './auth.service';

const loginUser = catchAsync(async (req, res) => {
    const result = await AuthServices.loginUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Logged in successfully',
        data: result,
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
