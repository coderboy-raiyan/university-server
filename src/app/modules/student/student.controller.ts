import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from './student.interface';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB();
    return sendResponse<TStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrieved successfully',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrieved successfully',
        data: result,
    });
});

const deleteStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is deleted successfully',
        data: result,
    });
});
const updateStudent = catchAsync(async (req, res) => {
    const { studentId } = req.params;
    const result = await StudentServices.updateStudentFromDB(studentId, req.body);
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
