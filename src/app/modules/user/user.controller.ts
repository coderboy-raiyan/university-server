import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from '../student/student.interface';
import UserServices from './user.service';

const createStudent = catchAsync(async (req, res) => {
    const { password, student } = req.body;
    const result = await UserServices.createStudentToDB(password, student);

    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student created successfully',
        data: result,
    });
});

const UserControllers = {
    createStudent,
};

export default UserControllers;
