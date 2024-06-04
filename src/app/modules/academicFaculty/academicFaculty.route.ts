import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicFacultyControllers } from './academicFaculty.controller';
import AcademicFacultyValidations from './academicFaculty.validation';

const router = Router();

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);
router.get('/:id', AcademicFacultyControllers.getSingleAcademicFaculty);
router.patch(
    '/:id',
    validateRequest(AcademicFacultyValidations.updateAcademicFacultyValidationSchema),
    AcademicFacultyControllers.updateAcademicFaculty
);
router.post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidations.createAcademicFacultyValidationSchema),
    AcademicFacultyControllers.createAcademicFaculty
);

const AcademicFacultyRoutes = router;

export default AcademicFacultyRoutes;
