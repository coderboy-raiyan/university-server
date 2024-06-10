import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import UserUtils from './user.utils';

const createStudentToDB = async (password: string | null, payload: TStudent): Promise<TStudent> => {
    if (!password) {
        password = config.STUDENT_DEFAULT_PASSWORD;
    }
    const user: Partial<TUser> = {};
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    const academicDepartment = await AcademicDepartment.findById(payload.academicDepartment);

    if (!admissionSemester) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Academic semester not found!');
    }
    if (!academicDepartment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Academic department not found!');
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        user.id = await UserUtils.generateStudentId(admissionSemester);

        user.role = 'student';
        user.password = password;

        // transaction - 1
        const createdUser = await User.create([user], { session });

        if (!createdUser.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user!');
        }

        payload.id = createdUser[0].id;
        payload.user = createdUser[0]._id;

        // transaction - 2
        const createdStudent = await Student.create([payload], { session });

        if (!createdStudent.length) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student!');
        }

        await session.commitTransaction();
        await session.endSession();

        return createdStudent[0];
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        if (error instanceof ApiError) {
            throw new ApiError(error.statusCode, error.message);
        } else {
            throw new Error(error);
        }
    }
};

const UserServices = {
    createStudentToDB,
};

export default UserServices;
