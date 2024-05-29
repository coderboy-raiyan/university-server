import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
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
        throw new Error(error);
    }
};

const UserService = {
    createStudentToDB,
};

export default UserService;
