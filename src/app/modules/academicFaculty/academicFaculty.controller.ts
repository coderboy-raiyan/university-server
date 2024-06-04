import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.createAcademicFacultyFromDB(req.body);
    return sendResponse<TAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
    });
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDB();
    return sendResponse<TAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties retrieved successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFaultyFromDB(id);
    return sendResponse<TAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty retrieved successfully',
        data: result,
    });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await AcademicFacultyServices.updateAcademicFacultyToDB(id, req.body);
    return sendResponse<TAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result,
    });
});

export const AcademicFacultyControllers = {
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    createAcademicFaculty,
};
