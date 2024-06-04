import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TCourse } from './course.interface';
import CourseService from './course.service';

const createCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.createCourseInToDB(req.body);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course created successfully',
        data: result,
    });
});
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getAllCoursesFromDB();

    sendResponse<TCourse[]>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Courses retrieved successfully',
        data: result,
    });
});
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.getSingleCourseFromDB(req.params.id);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course retrieved successfully',
        data: result,
    });
});
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await CourseService.deleteCourseFromDB(req.params.id);

    sendResponse<TCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Course deleted successfully',
        data: result,
    });
});

const CourseController = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    deleteCourse,
};

export default CourseController;
