import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import FacultyController from './faculty.controller';
import FacultyValidation from './faculty.validation';

const router = Router();

router.get('/', FacultyController.getAllFaculties);
router.get('/:facultyId', FacultyController.getSingleFaculty);
router.patch(
    '/:facultyId',
    validateRequest(FacultyValidation.updateFacultyValidationSchema),
    FacultyController.updateFaculty
);
router.delete('/:facultyId', FacultyController.deleteFaculty);

const FacultyRoutes = router;

export default FacultyRoutes;
