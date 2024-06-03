import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TAdmin } from './admin.interface';
import AdminService from './admin.service';

const createAdmin = catchAsync(async (req, res) => {
    const result = await AdminService.createAdminInDB(req.body);
    sendResponse<TAdmin>(res, {
        statusCode: httpStatus.OK,
        message: 'Admin created successfully',
        success: true,
        data: result,
    });
});

const getAllAdmins = catchAsync(async (req, res) => {
    const result = await AdminService.getAllAdminsFromDB(req.query);
    sendResponse<TAdmin[]>(res, {
        statusCode: httpStatus.OK,
        message: 'Admins retrieved successfully',
        success: true,
        data: result,
    });
});
const getSingleAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const result = await AdminService.getSingleAdminFromDB(adminId);
    sendResponse<TAdmin>(res, {
        statusCode: httpStatus.OK,
        message: 'Admin retrieved successfully',
        success: true,
        data: result,
    });
});
const updateAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const result = await AdminService.updateAdminToDB(adminId, req.body);
    sendResponse<TAdmin>(res, {
        statusCode: httpStatus.OK,
        message: 'Admin updated successfully',
        success: true,
        data: result,
    });
});
const deleteAdmin = catchAsync(async (req, res) => {
    const { adminId } = req.params;
    const result = await AdminService.deleteAdminFromDB(adminId);
    sendResponse<TAdmin>(res, {
        statusCode: httpStatus.OK,
        message: 'Admin deleted successfully',
        success: true,
        data: result,
    });
});

const AdminController = {
    getAllAdmins,
    getSingleAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin,
};

export default AdminController;
