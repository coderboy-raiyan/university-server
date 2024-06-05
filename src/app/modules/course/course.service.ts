import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import ApiError from '../../errors/ApiError';
import CourseConstants from './course.contanst';
import { TCourse } from './course.interface';
import Course from './course.model';

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

    if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        // filter out deleted Pre Requisite courses
        const deletedPreRequisites = preRequisiteCourses
            .filter((el) => el.course && el.isDeleted)
            .map((el) => el.course);

        await Course.findByIdAndUpdate(
            id,
            {
                $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisites } } },
            },
            { new: true }
        );

        //  filter out new Pre Requisite courses
        const newPreRequisites = preRequisiteCourses.filter((el) => el.course && !el.isDeleted);

        await Course.findByIdAndUpdate(id, {
            $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
        });
    }

    const updatedBasicCourseInfo = await Course.findByIdAndUpdate(id, remainingObj, {
        new: true,
        runValidators: true,
    });

    return updatedBasicCourseInfo;
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
    updateCourseIntoDB,
};

export default CourseServices;
