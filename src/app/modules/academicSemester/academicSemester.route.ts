import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicSemesterController from './academicSemester.controller';
import AcademicSemesterValidation from './academicSemester.validation';

const router = Router();

router.post(
    '/create-academic-semester',
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester
);

router.get('/', AcademicSemesterController.getAllAcademicSemesters);
router.get('/:semesterId', AcademicSemesterController.getSingleAcademicSemester);
router.patch(
    '/:semesterId',
    validateRequest(AcademicSemesterValidation.updateAcademicSemesterValidationSchema),
    AcademicSemesterController.updateAcademicSemester
);

const AcademicSemesterRoutes = router;

export default AcademicSemesterRoutes;
