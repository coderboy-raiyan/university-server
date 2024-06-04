import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TFaculty } from './faculty.interface';
import FacultyServices from './faculty.service';

const createFaculty = catchAsync(async (req, res) => {
    const result = await FacultyServices.createFacultyInDB(req.body);
    sendResponse<TFaculty>(res, {
        statusCode: httpStatus.OK,
        message: 'Faculties created successfully',
        success: true,
        data: result,
    });
});

const getAllFaculties = catchAsync(async (req, res) => {
    const result = await FacultyServices.getAllFacultiesFromDB(req.query);
    sendResponse<TFaculty[]>(res, {
        statusCode: httpStatus.OK,
        message: 'Faculties retrieved successfully',
        success: true,
        data: result,
    });
});
const getSingleFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(id);
    sendResponse<TFaculty>(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty retrieved successfully',
        success: true,
        data: result,
    });
});
const updateFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.updateFacultyToDB(id, req.body);
    sendResponse<TFaculty>(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty updated successfully',
        success: true,
        data: result,
    });
});
const deleteFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(id);
    sendResponse<TFaculty>(res, {
        statusCode: httpStatus.OK,
        message: 'Faculty deleted successfully',
        success: true,
        data: result,
    });
});

const FacultyControllers = {
    getAllFaculties,
    getSingleFaculty,
    createFaculty,
    updateFaculty,
    deleteFaculty,
};

export default FacultyControllers;
