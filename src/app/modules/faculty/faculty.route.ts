import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import FacultyControllers from './faculty.controller';
import FacultyValidations from './faculty.validation';

const router = Router();

router.get('/', auth, FacultyControllers.getAllFaculties);
router.get('/:id', FacultyControllers.getSingleFaculty);
router.patch(
    '/:id',
    validateRequest(FacultyValidations.updateFacultyValidationSchema),
    FacultyControllers.updateFaculty
);
router.delete('/:id', FacultyControllers.deleteFaculty);

const FacultyRoutes = router;

export default FacultyRoutes;
