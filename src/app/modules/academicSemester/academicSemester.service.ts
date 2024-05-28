import { TAcademicSemester } from './academicSemester.interface';
import AcademicSemester from './academicSemester.mode';

const createAcademicSemesterToDB = async (
    semester: TAcademicSemester
): Promise<TAcademicSemester> => {
    const result = await AcademicSemester.create(semester);
    return result;
};

const AcademicSemesterService = {
    createAcademicSemesterToDB,
};

export default AcademicSemesterService;
