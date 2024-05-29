import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.createAcademicDepartmentFromDB(req.body);
    return sendResponse<TAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department created successfully',
        data: result,
    });
});
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentService.getAllAcademicDepartmentsFromDB();
    return sendResponse<TAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic departments retrieved successfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.getSingleAcademicDepartmentFromDB(departmentId);
    return sendResponse<TAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department retrieved successfully',
        data: result,
    });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentService.updateAcademicDepartmentToDB(
        departmentId,
        req.body
    );
    return sendResponse<TAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department updated successfully',
        data: result,
    });
});

export const AcademicDepartmentController = {
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    createAcademicDepartment,
    updateAcademicDepartment,
};
