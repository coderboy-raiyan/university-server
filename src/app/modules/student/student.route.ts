import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { StudentControllers } from './student.controller';
import StudentValidations from './student.validation';

const router = Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.patch(
    '/:id',
    validateRequest(StudentValidations.updateStudentValidationSchema),
    StudentControllers.updateStudent
);
router.delete('/:id', StudentControllers.deleteStudent);

const StudentRoutes = router;

export default StudentRoutes;
