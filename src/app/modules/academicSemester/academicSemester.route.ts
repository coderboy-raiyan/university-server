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

const AcademicSemesterRoutes = router;

export default AcademicSemesterRoutes;
