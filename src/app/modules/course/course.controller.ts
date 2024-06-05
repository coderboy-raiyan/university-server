import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TCourse } from './course.interface';
import CourseServices from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.createCourseInToDB(req.body);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course created successfully',
        data: result,
    });
});
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.getAllCoursesFromDB(req.query);

    sendResponse<TCourse[]>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Courses retrieved successfully',
        data: result,
    });
});
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.getSingleCourseFromDB(req.params.id);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course retrieved successfully',
        data: result,
    });
});
const updateCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.updateCourseIntoDB(req.params.id, req.body);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course updated successfully',
        data: result,
    });
});
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseServices.deleteCourseFromDB(req.params.id);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course deleted successfully',
        data: result,
    });
});

const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
    updateCourse,
};

export default CourseControllers;
