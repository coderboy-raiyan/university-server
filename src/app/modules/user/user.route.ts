import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
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

export const UserRoutes = router;
