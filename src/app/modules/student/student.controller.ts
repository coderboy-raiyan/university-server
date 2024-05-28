import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TStudent } from './student.interface';
import { StudentServices } from './student.service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
    const result = await StudentServices.getAllStudentsFromDB();
    return sendResponse<TStudent[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Students retrieved successfully',
        data: result,
    });
});

const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
    const { id: studentId } = req.params;
    const result = await StudentServices.getSingleStudentsFromDB(studentId);
    return sendResponse<TStudent>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student retrieved successfully',
        data: result,
    });
});

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
};
