import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import AdminControllers from '../admin/admin.controller';
import AdminValidations from '../admin/admin.validation';
import FacultyControllers from '../faculty/faculty.controller';
import FacultyValidations from '../faculty/faculty.validation';
import UserConstants from './user.constant';
import UserControllers from './user.controller';
import UserValidations from './user.validation';

const router = Router();

router.post(
    '/create-student',
    auth(UserConstants.USER_ROLE_ENUM.admin),
    validateRequest(UserValidations.createUserAndStudentValidationSchema),
    UserControllers.createStudent
);

router.post(
    '/create-faculty',
    validateRequest(FacultyValidations.createFacultyValidationSchema),
    FacultyControllers.createFaculty
);

router.post(
    '/create-admin',
    validateRequest(AdminValidations.createAdminValidationSchema),
    AdminControllers.createAdmin
);

const UserRoutes = router;

export default UserRoutes;
