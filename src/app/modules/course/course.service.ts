import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { TCourse } from './course.interface';
import Course from './course.model';

const createCourseInToDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};
const getAllCoursesFromDB = async () => {
    const result = await Course.find({});
    return result;
};
const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found!');
    }
    return result;
};
const deleteCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found!');
    }
    return result;
};

const CourseServices = {
    createCourseInToDB,
    getAllCoursesFromDB,
    getSingleCourseFromDB,
    deleteCourseFromDB,
};

export default CourseServices;
