import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import FacultyController from './faculty.controller';
import FacultyValidation from './faculty.validation';

const router = Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
    '/:id',
    validateRequest(FacultyValidation.updateFacultyValidationSchema),
    FacultyController.updateFaculty
);
router.delete('/:id', FacultyController.deleteFaculty);

const FacultyRoutes = router;

export default FacultyRoutes;
