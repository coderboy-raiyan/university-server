import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../errors/ApiError';
import User from '../user/user.model';
import Student from './student.model';

const getAllStudentsFromDB = async () => {
    const result = await Student.find({})
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};

const getSingleStudentsFromDB = async (id: string) => {
    const result = await Student.findOne({ _id: id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
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
};
