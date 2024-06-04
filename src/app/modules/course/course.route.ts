import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import CourseControllers from './course.controller';
import CourseValidations from './course.validation';

const router = Router();

router.get('/', CourseControllers.getAllCourses);
router.get('/:id', CourseControllers.getSingleCourse);
router.post(
    '/create-course',
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
);

router.delete('/:id', CourseControllers.deleteCourse);

const CourseRoutes = router;

export default CourseRoutes;
