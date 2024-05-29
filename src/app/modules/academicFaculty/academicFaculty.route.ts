import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicController } from './academicFaculty.controller';
import AcademicFacultyValidation from './academicFaculty.validation';

const router = Router();

router.get('/', AcademicController.getAllAcademicFaculties);
router.get('/:facultyId', AcademicController.getSingleAcademicFaculty);
router.patch('/:facultyId', AcademicController.updateAcademicFaculty);
router.post(
    '/create-academic-faculty',
    validateRequest(AcademicFacultyValidation.createAcademicFacultyValidationSchema),
    AcademicController.createAcademicFaculty
);

export const AcademicFacultyRoutes = router;
