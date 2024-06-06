import httpStatus from 'http-status';
import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import ApiError from '../../errors/ApiError';
import CourseConstants from './course.constant';
import { TCourse, TCourseFaculty } from './course.interface';
import Course, { CourseFaculty } from './course.model';

const createCourseInToDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};
const getAllCoursesFromDB = async (query: Record<string, unknown>) => {
    // handling code search for avoiding cast Error
    if (!isNaN(query?.searchTerm as number)) {
        query.searchTerm = Number(query.searchTerm);
    }

    const CourseModelQuery = new QueryBuilder(Course.find(), query)
        .search(CourseConstants.CourseSearchAbleFields)
        .filter()
        .paginate()
        .sort()
        .fields();

    const result = await CourseModelQuery.ModelQuery.populate('preRequisiteCourses.course');
    return result;
};
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate({
        path: 'preRequisiteCourses',
        populate: {
            path: 'course',
        },
    });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found!');
    }
    return result;
};

const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...remainingObj } = payload;

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        if (preRequisiteCourses && preRequisiteCourses.length > 0) {
            // filter out deleted Pre Requisite courses
            const deletedPreRequisites = preRequisiteCourses
                .filter((el) => el.course && el.isDeleted)
                .map((el) => el.course);

            const deletedPreRequisiteCourse = await Course.findByIdAndUpdate(
                id,
                {
                    $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
                },
                { new: true, session, runValidators: true }
            );

            if (!deletedPreRequisiteCourse) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update course!');
            }

            //  filter out new Pre Requisite courses
            const newPreRequisites = preRequisiteCourses.filter((el) => el.course && !el.isDeleted);

            const addNewPreRequisiteCourse = await Course.findByIdAndUpdate(
                id,
                {
                    $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
                },
                { session, new: true, runValidators: true }
            );

            if (!addNewPreRequisiteCourse) {
                throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update course!');
            }
        }

        const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, remainingObj, {
            new: true,
            runValidators: true,
            session,
        });

        if (!updatedBasicCourseInfo) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to update course!');
        }

        await session.commitTransaction();
        await session.endSession();

        return updatedBasicCourseInfo;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
};

const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found!');
    }
    return result;
};

const assignFacultiesWithCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findOneAndUpdate(
        { course: id },
        {
            course: id,
            $addToSet: { faculties: { $each: payload.faculties } },
        },
        { upsert: true, new: true }
    );

    return result;
};
const removeFacultiesFromCourseIntoDB = async (id: string, payload: Partial<TCourseFaculty>) => {
    const result = await CourseFaculty.findOneAndUpdate(
        { course: id },
        {
            $pull: { faculties: { $in: payload.faculties } },
        },
        { new: true }
    );

    return result;
};

const CourseServices = {
    createCourseInToDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
    updateCourseIntoDB,
    assignFacultiesWithCourseIntoDB,
    removeFacultiesFromCourseIntoDB,
};

export default CourseServices;
