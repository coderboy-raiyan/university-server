import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
import AcademicDepartmentValidations from './academicDepartment.validation';

const router = Router();

router.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);
router.get('/:departmentId', AcademicDepartmentControllers.getSingleAcademicDepartment);
router.patch(
    '/:departmentId',
    validateRequest(AcademicDepartmentValidations.updateAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.updateAcademicDepartment
);
router.post(
    '/create-academic-department',
    validateRequest(AcademicDepartmentValidations.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment
);

const AcademicDepartmentRoutes = router;

export default AcademicDepartmentRoutes;
