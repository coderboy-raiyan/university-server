import httpStatus from 'http-status';
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

    const result = await AcademicSemester.create(semester);
    return result;
};

const AcademicSemesterService = {
    createAcademicSemesterToDB,
};

export default AcademicSemesterService;
