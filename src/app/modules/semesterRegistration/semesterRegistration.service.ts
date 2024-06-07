import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import ApiError from '../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { SemesterRegistrationStatusEnum } from './semesterRegistration.constant';
import { TSemesterRegistrationSemester } from './semesterRegistration.interface';
import SemesterRegistration from './semesterRegistration.model';

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistrationSemester) => {
    const { academicSemester } = payload;

    // check if there any registered that is already upcoming or ongoing
    const isThereAnyUpcomingOrOngoingSemester = await SemesterRegistration.findOne({
        $or: [
            { status: SemesterRegistrationStatusEnum.UPCOMING },
            { status: SemesterRegistrationStatusEnum.ONGOING },
        ],
    });

    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            `There is already a ${isThereAnyUpcomingOrOngoingSemester.status} registered semester exists!`
        );
    }

    // check if the Academic Semester Exists
    const isAcademicSemesterExists = await AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Academic Semester is not found!');
    }

    // check if the Semester is already registered
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

const updateSemesterRegistrationIntoDB = async (
    id: string,
    payload: Partial<TSemesterRegistrationSemester>
) => {
    const requestedSemester = await SemesterRegistration.findById(id);
    if (!requestedSemester) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Registered semester not found!');
    }
    if (requestedSemester?.status === SemesterRegistrationStatusEnum.ENDED) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'This semester is already Ended!');
    }

    // UPCOMING -> ONGOING -> ENDED
    if (
        requestedSemester.status === SemesterRegistrationStatusEnum.UPCOMING &&
        payload?.status === SemesterRegistrationStatusEnum.ENDED
    ) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'You can not change status directly from Upcoming to Ended'
        );
    }
    if (
        requestedSemester.status === 'ONGOING' &&
        payload?.status === SemesterRegistrationStatusEnum.UPCOMING
    ) {
        throw new ApiError(
            httpStatus.BAD_REQUEST,
            'You can not change status directly from Ongoing to Upcoming'
        );
    }
    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const SemesterRegistrationServices = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
};

export default SemesterRegistrationServices;
