import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import transformNonPrimitiveObjectToPrimitive from '../../utils/transformNonPrimitiveObjectToPrimitive';
import User from '../user/user.model';
import FacultyConstants from './faculty.constant';
import { TFaculty } from './faculty.interface';
import Faculty from './faculty.model';
import FacultyUtils from './faculty.utils';

const createFacultyInDB = async (payload: { password?: string; faculty: TFaculty }) => {
    const password = payload?.password || config.FACULTY_DEFAULT_PASSWORD;

    const isExists = await Faculty.findOne({ email: payload.faculty.email });

    if (isExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Faculty already exists!');
    }

    const incrementalId = await FacultyUtils.generateAutoIncrementalId();

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const createdUser = await User.create([{ id: incrementalId, password, role: 'faculty' }], {
            session,
        });

        if (!createdUser) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create user!');
        }

        const faculty = { ...payload.faculty, id: createdUser[0]?.id, user: createdUser[0]?._id };
        const createdFaculty = await Faculty.create([faculty], { session });

        if (!createdFaculty) {
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Failed to create faculty!');
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

const getAllFacultiesFromDB = async (query: Record<string, unknown>) => {
    const facultyQuery = new QueryBuilder(Faculty.find(), query)
        .search(FacultyConstants.FacultySearchAbleFields)
        .filter()
        .paginate()
        .sort()
        .fields();

    const result = await facultyQuery.ModelQuery.populate('academicFaculty').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });

    return result;
};
const getSingleFacultyFromDB = async (id: string) => {
    const result = await Faculty.findOne({ _id: id });
    return result;
};

const updateFacultyToDB = async (id: string, payload: TFaculty) => {
    const { name, ...restObj } = payload;
    const convertNonPrimitiveToPrimitive = transformNonPrimitiveObjectToPrimitive<TFaculty>(
        restObj,
        { name }
    );
    const result = await Faculty.findOneAndUpdate({ _id: id }, convertNonPrimitiveToPrimitive, {
        new: true,
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!');
    }
    return result;
};

const deleteFacultyFromDB = async (id: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deletedFaculty = await Faculty.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            {
                new: true,
                session,
            }
        );

        if (!deletedFaculty) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Failed to deleted faculty');
        }

        const deletedUser = await User.findOneAndUpdate(
            { id: deletedFaculty?.id },
            { isDeleted: true },
            {
                new: true,
                session,
            }
        );

        if (!deletedUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Failed to deleted faculty');
        }

        await session.commitTransaction();
        await session.endSession();

        return deletedFaculty;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const FacultyServices = {
    getAllFacultiesFromDB,
    getSingleFacultyFromDB,
    updateFacultyToDB,
    deleteFacultyFromDB,
    createFacultyInDB,
};
export default FacultyServices;
