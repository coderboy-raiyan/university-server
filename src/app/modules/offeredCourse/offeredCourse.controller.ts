import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TOfferedCourse } from './offeredCourse.interface';
import OfferedCourseServices from './offeredCourse.service';

const createOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDB(req.body);
    sendResponse<TOfferedCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Offered course created successfully',
        data: result,
    });
});
const getAllOfferedCourses = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getAllOfferedCoursesFromDB();
    sendResponse<TOfferedCourse[]>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Offered courses retrieved successfully',
        data: result,
    });
});
const getSingleOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.getSingleOfferedCourseFromDB(req.params.id);
    sendResponse<TOfferedCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Offered course retrieved successfully',
        data: result,
    });
});
const updateOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.updateOfferedCourseIntoDB(req.params.id, req.body);
    sendResponse<TOfferedCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Offered course created successfully',
        data: result,
    });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
    const result = await OfferedCourseServices.deleteOfferedCourseFromDB(req.params.id);
    sendResponse<TOfferedCourse>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Offered course deleted successfully',
        data: result,
    });
});

const OfferedCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse,
    getAllOfferedCourses,
    getSingleOfferedCourse,
    deleteOfferedCourse,
};

export default OfferedCourseControllers;
