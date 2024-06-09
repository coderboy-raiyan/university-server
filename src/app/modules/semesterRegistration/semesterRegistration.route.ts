import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import SemesterRegistrationControllers from './semesterRegistration.controller';
import SemesterRegistrationValidations from './semesterRegistration.validation';

const router = Router();

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistrations);
router.get('/:id', SemesterRegistrationControllers.getSingleSemesterRegistration);

router.post(
    '/create-semester-registration',
    validateRequest(SemesterRegistrationValidations.createSemesterRegistrationValidationSchema),
    SemesterRegistrationControllers.createSemesterRegistration
);
router.patch(
    '/update-semester-registration/:id',
    validateRequest(SemesterRegistrationValidations.updateSemesterRegistrationValidationSchema),
    SemesterRegistrationControllers.updateSemesterRegistration
);
router.delete('/:id', SemesterRegistrationControllers.deleteSemesterRegistration);

const SemesterRegistrationRoutes = router;

export default SemesterRegistrationRoutes;
