import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import ApiError from '../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TSemesterRegistrationSemester } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistrationSemester) => {
    const { academicSemester } = payload;
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Academic Semester is not found!');
    }

    const isSemesterRegistrationExists = await SemesterRegistration.findOne({ academicSemester });
    if (isSemesterRegistrationExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'This semester is already registered!');
    }

    const result = await SemesterRegistration.create(payload);
    return result;
};

const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
    const modelQuery = new QueryBuilder(
        SemesterRegistration.find().populate('academicSemester'),
        query
    )
        .filter()
        .paginate()
        .sort()
        .fields();
    const result = await modelQuery.ModelQuery;
    return result;
};
const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id);
    return result;
};

const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
};

export default SemesterRegistrationServices;
