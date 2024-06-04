import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from './student.interface';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB(req.query);
    return sendResponse<TStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrieved successfully',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(id);
    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrieved successfully',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.deleteStudentFromDB(id);
    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is deleted successfully',
        data: result,
    });
});
const updateStudent = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await StudentServices.updateStudentFromDB(id, req.body);
    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is updated successfully',
        data: result,
    });
});

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
    updateStudent,
};
