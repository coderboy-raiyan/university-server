import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFacultyService } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.createAcademicFacultyFromDB(req.body);
    return sendResponse<TAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty created successfully',
        data: result,
    });
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
    const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();
    return sendResponse<TAcademicFaculty[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculties retrieved successfully',
        data: result,
    });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.getSingleAcademicFaultyFromDB(facultyId);
    return sendResponse<TAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty retrieved successfully',
        data: result,
    });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyService.updateAcademicFacultyToDB(facultyId, req.body);
    return sendResponse<TAcademicFaculty>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Faculty updated successfully',
        data: result,
    });
});

export const AcademicController = {
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateAcademicFaculty,
    createAcademicFaculty,
};
