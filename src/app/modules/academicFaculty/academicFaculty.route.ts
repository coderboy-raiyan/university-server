import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicFacultyController } from './academicFaculty.controller';
import AcademicFacultyValidation from './academicFaculty.validation';

const router = Router();

router.get('/', AcademicFacultyController.getAllAcademicFaculties);
router.get('/:facultyId', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
    '/:facultyId',
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
    AcademicFacultyController.updateAcademicFaculty
);
router.post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicFacultyController.createAcademicFaculty
);

export const AcademicFacultyRoutes = router;
