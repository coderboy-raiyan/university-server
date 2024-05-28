import httpStatus from 'http-status';
import { config } from '../../config';
import ApiError from '../../errors/ApiError';
import AcademicSemester from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';
import UserUtils from './user.utils';

const createStudentToDB = async (password: string | null, payload: TStudent): Promise<TStudent> => {
    const isStudentExists = await Student.findOne({ email: payload.email });

    if (isStudentExists) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Student already exists!');
    }
    if (!password) {
        password = config.STUDENT_DEFAULT_PASSWORD;
    }
    const user: Partial<TUser> = {};

    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    user.id = await UserUtils.generateStudentId(admissionSemester);

    user.role = 'student';
    user.password = password;

    const createdUser = await User.create(user);

    if (Object.keys(createdUser).length) {
        payload.id = createdUser.id;
        payload.user = createdUser._id;
        const createdStudent = await Student.create(payload);
        return createdStudent;
    }
};

const UserService = {
    createStudentToDB,
};

export default UserService;
