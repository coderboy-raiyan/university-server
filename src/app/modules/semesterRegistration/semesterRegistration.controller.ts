import httpStatus from 'http-status';
import mongoose from 'mongoose';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TSemesterRegistrationSemester } from './semesterRegistration.interface';
import SemesterRegistrationServices from './semesterRegistration.service';

const createSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.createSemesterRegistrationIntoDB(req.body);

    sendResponse<TSemesterRegistrationSemester>(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: 'Semester registered successfully',
        data: result,
    });
});
const getAllSemesterRegistrations = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB(req.query);

    sendResponse<TSemesterRegistrationSemester[]>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Semesters retrieved successfully',
        data: result,
    });
});
const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(
        req.params.id
    );

    sendResponse<TSemesterRegistrationSemester>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Semester retrieved successfully',
        data: result,
    });
});
const updateSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(
        req.params.id,
        req.body
    );

    sendResponse<TSemesterRegistrationSemester>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Semester updated successfully',
        data: result,
    });
});
const deleteSemesterRegistration = catchAsync(async (req, res) => {
    const result = await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(
        req.params.id
    );

    sendResponse<{
        deletedSemester: TSemesterRegistrationSemester;
        deletedOfferedCourses: mongoose.mongo.DeleteResult;
    }>(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Semester registration and offered courses deleted successfully',
        data: result,
    });
});

const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration,
};

export default SemesterRegistrationControllers;
