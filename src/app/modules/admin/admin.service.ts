import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import transformNonPrimitiveObjectToPrimitive from '../../utils/transformNonPrimitiveObjectToPrimitive';
import User from '../user/user.model';
import AdminConstants from './admin.constant';
import { TAdmin } from './admin.interface';
import { default as Admin, default as Faculty } from './admin.model';
import AdminUtils from './admin.utils';

const createAdminInDB = async (payload: { password?: string; admin: TAdmin }) => {
    const password = payload?.password || config.ADMIN_DEFAULT_PASSWORD;

    const isExists = await Admin.findOne({ email: payload.admin.email });

    if (isExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Admin already exists!');
    }

    const incrementalId = await AdminUtils.generateAutoIncrementalId();

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdUser = await User.create([{ id: incrementalId, password, role: 'admin' }], {
            session,
        });

        if (!createdUser) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create user!');
        }

        const admin = { ...payload.admin, id: createdUser[0]?.id, user: createdUser[0]?._id };
        const createdFaculty = await Faculty.create([admin], { session });

        if (!createdFaculty) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create admin!');
        }

        await session.commitTransaction();
        await session.endSession();
        return createdFaculty[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(Admin.find(), query)
        .search(AdminConstants.AdminSearchAbleFields)
        .filter()
        .paginate()
        .sort()
        .fields();

    const result = await facultyQuery.ModelQuery.populate({
        path: 'managementDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });

    return result;
};
const getSingleAdminFromDB = async (id: string) => {
    const result = await Admin.findOne({ _id: id }).populate({
        path: 'managementDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
};

const updateAdminToDB = async (id: string, payload: TAdmin) => {
    const { name, ...restObj } = payload;
    const convertNonPrimitiveToPrimitive = transformNonPrimitiveObjectToPrimitive<TAdmin>(restObj, {
        name,
    });
    const result = await Admin.findOneAndUpdate({ _id: id }, convertNonPrimitiveToPrimitive, {
        new: true,
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found!');
    }
    return result;
};

const deleteAdminFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deletedAdmin = await Admin.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            {
                new: true,
                session,
            }
        );

        if (!deletedAdmin) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Admin to deleted faculty');
        }

        const deletedUser = await User.findOneAndUpdate(
            { id: deletedAdmin?.id },
            { isDeleted: true },
            {
                new: true,
                session,
            }
        );

        if (!deletedUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedAdmin;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const AdminServices = {
    getAllAdminsFromDB,
    getSingleAdminFromDB,
    updateAdminToDB,
    deleteAdminFromDB,
    createAdminInDB,
};
export default AdminServices;
