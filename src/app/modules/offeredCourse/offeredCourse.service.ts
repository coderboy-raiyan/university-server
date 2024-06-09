import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import AcademicDepartment from '../academicDepartment/academicDepartment.model';
import AcademicFaculty from '../academicFaculty/academicFaculty.model';
import Course from '../course/course.model';
import Faculty from '../faculty/faculty.model';
import { TSemesterRegistrationSemester } from '../semesterRegistration/semesterRegistration.interface';
import SemesterRegistration from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import OfferedCourse from './offeredCourse.model';
import hasTimeConflict from './offeredCourse.utils';

const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
    const {
        semesterRegistration,
        academicDepartment,
        academicFaculty,
        course,
        faculty,
        section,
        days,
        startTime,
        endTime,
    } = payload;

    // Check if Offered course exists with the same section
    const isOfferedCourseAlreadyExists = await OfferedCourse.findOne({
        semesterRegistration,
        course,
        section,
    });

    if (isOfferedCourseAlreadyExists) {
        throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            'Offered course with same section is already exists!'
        );
    }

    // check if Semester registration exists
    const isSemesterRegistrationExists = await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Semester registration not found!');
    }
    // check if Academic Faculty exists
    const isAcademicFacultyExists = await AcademicFaculty.findById(academicFaculty);
    if (!isAcademicFacultyExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Academic faculty not found!');
    }
    // check if Academic Department exists
    const isAcademicDepartmentExists = await AcademicDepartment.findById(academicDepartment);
    if (!isAcademicDepartmentExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Academic department not found!');
    }
    // check if Course exists
    const isCourseExists = await Course.findById(course);
    if (!isCourseExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Course not found!');
    }
    // check if Faculty exists
    const isFacultyExists = await Faculty.findById(faculty);
    if (!isFacultyExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!');
    }

    // Check if the Academic department belong to the Academic faculty
    if (
        isAcademicDepartmentExists.academicFaculty.toString() !==
        isAcademicFacultyExists._id.toString()
    ) {
        throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            `This ${isAcademicDepartmentExists.name} does not belong to ${isAcademicFacultyExists.name}`
        );
    }

    // check if the faculty is available on the day
    const facultyAlreadyAssignedSchedule = await OfferedCourse.find(
        { semesterRegistration, faculty, days: { $in: days } },
        { _id: 0, days: 1, startTime: 1, endTime: 1 }
    );

    const newSchedule = {
        days,
        startTime,
        endTime,
    };

    if (hasTimeConflict(facultyAlreadyAssignedSchedule, newSchedule)) {
        throw new ApiError(
            httpStatus.CONFLICT,
            'This faculty is not available this time! Choose other time or days'
        );
    }

    payload.academicSemester = isSemesterRegistrationExists.academicSemester;

    const result = await OfferedCourse.create(payload);
    return result;
};

const getAllOfferedCoursesFromDB = async () => {
    const result = await OfferedCourse.find({});
    return result;
};
const getSingleOfferedCourseFromDB = async (id: string) => {
    const result = await OfferedCourse.findById(id);
    return result;
};

const updateOfferedCourseIntoDB = async (id: string, payload: Partial<TOfferedCourse>) => {
    const { faculty, days, startTime, endTime } = payload;
    // check if Offered course exists
    const isOfferedCourseExists = await OfferedCourse.findById(id).populate('semesterRegistration');

    if (!isOfferedCourseExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found!');
    }

    const semesterRegistrationStatus = (
        isOfferedCourseExists.semesterRegistration as TSemesterRegistrationSemester
    ).status;

    if (semesterRegistrationStatus !== 'UPCOMING') {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `You can not update this offered course as it is ${semesterRegistrationStatus}`
        );
    }

    // check if Faculty exists
    if (faculty) {
        const isFacultyExists = await Faculty.findById(faculty);
        if (!isFacultyExists) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found!');
        }
    }
    // check if the faculty is available on the day
    if (startTime && endTime) {
        const facultyAlreadyAssignedSchedule = await OfferedCourse.find(
            {
                semesterRegistration: isOfferedCourseExists.semesterRegistration,
                faculty,
                days: { $in: days },
            },
            { _id: 0, days: 1, startTime: 1, endTime: 1 }
        );
        const newSchedule = {
            days,
            startTime,
            endTime,
        };

        if (hasTimeConflict(facultyAlreadyAssignedSchedule, newSchedule)) {
            throw new ApiError(
                httpStatus.CONFLICT,
                'This faculty is not available this time! Choose other time or days'
            );
        }
    }
    const result = await OfferedCourse.findByIdAndUpdate(id, payload, { new: true });
    return result;
};

const deleteOfferedCourseFromDB = async (id: string) => {
    const isOfferedCourseExists = await OfferedCourse.findById(id).populate('semesterRegistration');

    if (!isOfferedCourseExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Offered course not found!');
    }

    const semesterRegistrationStatus = (
        isOfferedCourseExists.semesterRegistration as TSemesterRegistrationSemester
    ).status;

    if (semesterRegistrationStatus !== 'UPCOMING') {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            `You can not delete this offered course as it is ${semesterRegistrationStatus}`
        );
    }
    const result = await OfferedCourse.findByIdAndDelete(id);
    return result;
};

const OfferedCourseServices = {
    createOfferedCourseIntoDB,
    updateOfferedCourseIntoDB,
    getAllOfferedCoursesFromDB,
    getSingleOfferedCourseFromDB,
    deleteOfferedCourseFromDB,
};

export default OfferedCourseServices;
