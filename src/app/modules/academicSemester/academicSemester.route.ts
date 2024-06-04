import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AcademicSemesterControllers from './academicSemester.controller';
import AcademicSemesterValidations from './academicSemester.validation';

const router = Router();

router.post(
    '/create-academic-semester',
    validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema),
    AcademicSemesterControllers.createAcademicSemester
);

router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch(
    '/:semesterId',
    validateRequest(AcademicSemesterValidations.updateAcademicSemesterValidationSchema),
    AcademicSemesterControllers.updateAcademicSemester
);

const AcademicSemesterRoutes = router;

export default AcademicSemesterRoutes;
