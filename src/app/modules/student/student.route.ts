import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import StudentValidation from './student.validation';

const router = Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
    '/:studentId',
    validateRequest(StudentValidation.updateStudentValidationSchema),
    StudentControllers.updateStudent
);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
