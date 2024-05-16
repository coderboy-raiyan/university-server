import { Router } from 'express';
import { StudentControllers } from './student.controller';

const router = Router();

router.get('/', StudentControllers.getAllStudents);
router.get('/:id', StudentControllers.getSingleStudent);
router.post('/create-student', StudentControllers.createStudent);

export const StudentRoutes = router;
