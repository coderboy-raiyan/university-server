import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const findLatestStudentId = async (payload: TAcademicSemester): Promise<string | null> => {
    const isStudentExists = await User.findOne({ role: 'student' }, { _id: 0, id: 1 })
        .sort({ createdAt: -1 })
        .lean();

    if (isStudentExists) {
        return isStudentExists.id.substring(payload.year.length + payload.code.length);
    } else {
        return null;
    }
};

const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
    const currentId = (0).toString().padStart(4, '0');
    let incrementalId: string;

    const latestStudentId = await findLatestStudentId(payload);

    if (latestStudentId) {
        incrementalId = String(Number(latestStudentId) + 1).padStart(4, '0');
    } else {
        incrementalId = String(Number(currentId) + 1).padStart(4, '0');
    }

    incrementalId = `${payload.year}${payload.code}${incrementalId}`;

    return incrementalId;
};

const UserUtils = {
    generateStudentId,
};

export default UserUtils;
