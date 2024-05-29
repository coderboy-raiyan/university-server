import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import User from './user.model';

const findLatestStudentId = async (): Promise<string | null> => {
    const isStudentExists = await User.findOne({ role: 'student' }, { _id: 0, id: 1 })
        .sort({ createdAt: -1 })
        .lean();

    if (isStudentExists) {
        return isStudentExists.id;
    } else {
        return null;
    }
};

const generateStudentId = async (payload: TAcademicSemester): Promise<string> => {
    let currentId = (0).toString().padStart(4, '0');
    currentId = (parseInt(currentId) + 1).toString().padStart(4, '0');

    const latestStudentId = await findLatestStudentId();

    if (latestStudentId) {
        const lastStudentYear = latestStudentId.substring(0, payload?.year?.length); // 2024
        const lastStudentCode = latestStudentId.substring(
            lastStudentYear.length,
            lastStudentYear.length + payload?.code?.length
        ); // 01

        if (lastStudentYear === payload?.year && lastStudentCode === payload?.code) {
            currentId = (
                parseInt(latestStudentId.substring(payload?.year?.length + payload?.code?.length)) +
                1
            )
                .toString()
                .padStart(4, '0');
        }
    }

    currentId = `${payload?.year}${payload?.code}${currentId}`;

    return currentId;
};

const UserUtils = {
    generateStudentId,
};

export default UserUtils;
