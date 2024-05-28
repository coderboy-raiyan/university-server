import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemesterService from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.createAcademicSemesterToDB(req.body);
    sendResponse<TAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester created Successfully',
        data: result,
    });
});
const getAllAcademicSemesters = catchAsync(async (req, res) => {
    const result = await AcademicSemesterService.getAllAcademicSemestersFromDB();
    sendResponse<TAcademicSemester[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semesters retrieved Successfully',
        data: result,
    });
});
const getSingleAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterService.getSingleAcademicSemesterFromDB(semesterId);
    sendResponse<TAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester retrieved Successfully',
        data: result,
    });
});
const updateAcademicSemester = catchAsync(async (req, res) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterService.updateAcademicSemesterToDB(semesterId, req.body);
    sendResponse<TAcademicSemester>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic Semester updated Successfully',
        data: result,
    });
});

const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemesters,
    getSingleAcademicSemester,
    updateAcademicSemester,
};

export default AcademicSemesterController;
