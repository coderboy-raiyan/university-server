import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserConstants from '../user/user.constant';
import AuthControllers from './auth.controller';
import AuthValidations from './auth.validation';

const router = Router();

router.post(
    '/login',
    validateRequest(AuthValidations.loginValidationSchema),
    AuthControllers.loginUser
);
router.post(
    '/change-password',
    auth(
        UserConstants.USER_ROLE_ENUM.student,
        UserConstants.USER_ROLE_ENUM.admin,
        UserConstants.USER_ROLE_ENUM.faculty
    ),
    validateRequest(AuthValidations.changePasswordValidationSchema),
    AuthControllers.changePassword
);

const AuthRoutes = router;
export default AuthRoutes;
