import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import CourseController from './course.controller';
import CourseValidation from './course.validation';

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);
router.post(
    '/create-course',
    validateRequest(CourseValidation.createCourseValidationSchema),
    CourseController.createCourse
);

router.delete('/:id', CourseController.deleteCourse);

const CourseRoutes = router;

export default CourseRoutes;
