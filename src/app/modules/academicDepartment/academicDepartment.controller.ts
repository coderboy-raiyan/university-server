import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentFromDB(req.body);
    return sendResponse<TAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department created successfully',
        data: result,
    });
});
const getAllAcademicDepartments = catchAsync(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDB();
    return sendResponse<TAcademicDepartment[]>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic departments retrieved successfully',
        data: result,
    });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDB(departmentId);
    return sendResponse<TAcademicDepartment>(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department retrieved successfully',
        data: result,
    });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademicDepartmentToDB(
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

export const AcademicDepartmentControllers = {
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    createAcademicDepartment,
    updateAcademicDepartment,
};
