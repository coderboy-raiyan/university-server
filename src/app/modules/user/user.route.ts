import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminController from '../admin/admin.controller';
import AdminValidation from '../admin/admin.validation';
import FacultyController from '../faculty/faculty.controller';
import FacultyValidation from '../faculty/faculty.validation';
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
    validateRequest(FacultyValidation.createFacultyValidationSchema),
    FacultyController.createFaculty
);

router.post(
    '/create-admin',
    validateRequest(AdminValidation.createAdminValidationSchema),
    AdminController.createAdmin
);

const UserRoutes = router;

export default UserRoutes;
