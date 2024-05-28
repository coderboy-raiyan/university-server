import { config } from '../../config';
import { TStudent } from '../student/student.interface';
import Student from '../student/student.model';
import { TUser } from './user.interface';
import User from './user.model';

const createStudentToDB = async (password: string | null, student: TStudent): Promise<TStudent> => {
    if (!password) {
        password = config.STUDENT_DEFAULT_PASSWORD;
    }
    const user: Partial<TUser> = {};

    user.id = '2024010001';
    user.role = 'student';
    user.password = password;

    const createdUser = await User.create(user);

    if (Object.keys(createdUser).length) {
        student.id = createdUser.id;
        student.user = createdUser._id;
        const createdStudent = await Student.create(student);
        return createdStudent;
    }
};

const UserService = {
    createStudentToDB,
};

export default UserService;
