import httpStatus from 'http-status';
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
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationsFromDB();

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

const SemesterRegistrationControllers = {
    createSemesterRegistration,
    getAllSemesterRegistrations,
    getSingleSemesterRegistration,
};

export default SemesterRegistrationControllers;
