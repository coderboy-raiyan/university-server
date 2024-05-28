import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import UserController from './user.controller';
import UserValidation from './user.validation';

const router = Router();

router.post(
    '/create-student',
    validateRequest(UserValidation.createUserAndStudentValidationSchema),
    UserController.createStudent
);

export const UserRoutes = router;
