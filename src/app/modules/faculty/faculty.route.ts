import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import UserConstants from '../user/user.constant';
import FacultyControllers from './faculty.controller';
import FacultyValidations from './faculty.validation';

const router = Router();

router.get(
    '/',
    auth(UserConstants.USER_ROLE_ENUM.admin, UserConstants.USER_ROLE_ENUM.faculty),
    FacultyControllers.getAllFaculties
);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.patch(
    '/:id',
    validateRequest(FacultyValidations.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty
);
router.delete('/:id', FacultyControllers.deleteFaculty);

const FacultyRoutes = router;

export default FacultyRoutes;
