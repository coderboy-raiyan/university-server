import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminController from '../admin/admin.controller';
import AdminValidation from '../admin/admin.validation';
import FacultyController from '../faculty/faculty.controller';
import FacultyValidation from '../faculty/faculty.validation';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = Router();

router.post(
    '/create-student',
    validateRequest(UserValidation.createUserAndStudentValidationSchema),
    UserController.createStudent
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

export const UserRoutes = router;
