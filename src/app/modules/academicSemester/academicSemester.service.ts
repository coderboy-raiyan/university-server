import httpStatus from 'http-status';
import mongoose from 'mongoose';
import ApiError from '../../errors/ApiError';
import AcademicSemesterConstant from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.model';

const createAcademicSemesterToDB = async (
    semester: TAcademicSemester
): Promise<TAcademicSemester> => {
    if (AcademicSemesterConstant.SemesterAndCodeMapper[semester.name] !== semester.code) {
        throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            `Semester '${semester.name}' didn't match with code ${semester.code}. Did you mean code ${AcademicSemesterConstant.SemesterAndCodeMapper[semester.name]}`
        );
    }
    const isSemesterExistsWithSameYear =
        await AcademicSemester.isSemesterExistsInTheSameYear(semester);

    if (isSemesterExistsWithSameYear) {
        throw new ApiError(
            httpStatus.NOT_ACCEPTABLE,
            `Semester '${semester.name}' already exists in '${semester.year}'`
        );
    }

    const result = await AcademicSemester.create(semester);
    return result;
};

const getAllAcademicSemestersFromDB = async (): Promise<TAcademicSemester[]> => {
    const result = await AcademicSemester.find({});
    return result;
};

const getSingleAcademicSemesterFromDB = async (
    semesterId: string
): Promise<TAcademicSemester | null> => {
    if (!mongoose.isValidObjectId(semesterId)) {
        throw new ApiError(
            httpStatus.NOT_FOUND,
            'Semester is not found. Check if your id is correct or not!'
        );
    }
    const result = await AcademicSemester.findOne({ _id: semesterId });

    return result;
};

const updateAcademicSemesterToDB = async (
    semesterId: string,
    payload: TAcademicSemester
): Promise<TAcademicSemester> => {
    if (payload.code && payload.name) {
        const isSemesterExistsWithSameYear =
            await AcademicSemester.isSemesterExistsInTheSameYear(payload);

        if (AcademicSemesterConstant.SemesterAndCodeMapper[payload.name] !== payload.code) {
            throw new ApiError(
                httpStatus.NOT_ACCEPTABLE,
                `Semester '${payload.name}' didn't match with code ${payload.code}. Did you mean code ${AcademicSemesterConstant.SemesterAndCodeMapper[payload.name]}`
            );
        }

        if (isSemesterExistsWithSameYear) {
            throw new ApiError(
                httpStatus.NOT_ACCEPTABLE,
                `Semester '${payload.name}' already exists in '${payload.year}'`
            );
        }
    }
    const result = await AcademicSemester.findByIdAndUpdate(
        semesterId,
        { ...payload },
        { new: true }
    );
    return result;
};

const AcademicSemesterService = {
    createAcademicSemesterToDB,
    getAllAcademicSemestersFromDB,
    getSingleAcademicSemesterFromDB,
    updateAcademicSemesterToDB,
};

export default AcademicSemesterService;
