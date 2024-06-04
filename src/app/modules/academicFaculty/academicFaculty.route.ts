import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicFacultyController } from './academicFaculty.controller';
import AcademicFacultyValidation from './academicFaculty.validation';

const router = Router();

router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
    '/:id',
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
    AcademicFacultyController.updateAcademicFaculty
);
router.post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyController.createAcademicFaculty
);

const AcademicFacultyRoutes = router;

export default AcademicFacultyRoutes;
