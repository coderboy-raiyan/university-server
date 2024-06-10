import { Router } from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import CourseControllers from './course.controller';
import CourseValidations from './course.validation';

const router = Router();

router.get('/', auth('admin', 'faculty', 'student'), CourseControllers.getAllCourses);
router.get('/:id', auth('admin', 'faculty', 'student'), CourseControllers.getSingleCourse);
router.post(
    '/create-course',
    auth('admin'),
    validateRequest(CourseValidations.createCourseValidationSchema),
    CourseControllers.createCourse
);
router.patch(
    '/:id',
    auth('admin'),
    validateRequest(CourseValidations.updateCourseValidationSchema),
    CourseControllers.updateCourse
);

router.put(
    '/:courseId/assign-faculties',
    auth('admin'),
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.createOrAssignFacultiesWithCourse
);
router.delete(
    '/:courseId/remove-faculties',
    auth('admin'),
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.removeFacultiesFromCourse
);

router.delete('/:id', CourseControllers.deleteCourse);

const CourseRoutes = router;

export default CourseRoutes;
