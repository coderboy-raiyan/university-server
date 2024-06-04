import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminControllers from '../admin/admin.controller';
import AdminValidations from '../admin/admin.validation';
import FacultyControllers from '../faculty/faculty.controller';
import FacultyValidations from '../faculty/faculty.validation';
import UserControllers from './user.controller';
import UserValidations from './user.validation';

const router = Router();

router.post(
    '/create-student',
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
