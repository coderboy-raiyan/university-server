import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import ApiError from '../../errors/ApiError';
import transformNonPrimitiveObjectToPrimitive from '../../utils/transformNonPrimitiveObjectToPrimitive';
import User from '../user/user.model';
import StudentConstant from './student.constant';
import { TStudent } from './student.interface';
import Student from './student.model';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
    const studentQuery = new QueryBuilder<TStudent>(Student.find({}), query)
        .search(StudentConstant.StudentSearchAbleFields)
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await studentQuery.ModelQuery.populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty',
        },
    });
    return result;
};

const getSingleStudentsFromDB = async (id: string) => {
    const result = await Student.findOne({ id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};

const updateStudentFromDB = async (studentId: string, payload: Partial<TStudent>) => {
    const { name, guardian, localGuardian, ...restObject } = payload;

    const modifiedObject = transformNonPrimitiveObjectToPrimitive<TStudent>(restObject, {
        name,
        guardian,
        localGuardian,
    });

    const result = await Student.findOneAndUpdate({ id: studentId }, modifiedObject, { new: true });
    return result;
};

const deleteStudentFromDB = async (studentId: string) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();

        const deleteStudent = await Student.findOneAndUpdate(
            { id: studentId },
            { isDeleted: true },
            { new: true, session }
        );
        if (!deleteStudent) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete student!');
        }

        const deletedUser = await User.findOneAndUpdate(
            { id: studentId },
            { isDeleted: true },
            { new: true, session }
        );

        if (!deletedUser) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete user!');
        }

        await session.commitTransaction();
        await session.endSession();

        return deleteStudent;
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

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
    deleteStudentFromDB,
    updateStudentFromDB,
};
