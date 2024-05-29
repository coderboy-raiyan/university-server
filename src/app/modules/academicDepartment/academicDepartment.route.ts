import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentController } from './academicDepartment.controller';
import AcademicDepartmentValidation from './academicDepartment.validation';

const router = Router();

router.get('/', AcademicDepartmentController.getAllAcademicDepartments);
router.get('/:departmentId', AcademicDepartmentController.getSingleAcademicDepartment);
router.patch(
    '/:departmentId',
    validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
    AcademicDepartmentController.updateAcademicDepartment
);
router.post(
    '/create-academic-department',
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentController.createAcademicDepartment
);

export const AcademicDepartmentRoutes = router;
