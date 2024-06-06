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
router.patch(
    '/:id',
    validateRequest(CourseValidations.updateCourseValidationSchema),
    CourseControllers.updateCourse
);

router.put(
    '/:courseId/assign-faculties',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.createOrAssignFacultiesWithCourse
);
router.delete(
    '/:courseId/remove-faculties',
    validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
    CourseControllers.removeFacultiesFromCourse
);

router.delete('/:id', CourseControllers.deleteCourse);

const CourseRoutes = router;

export default CourseRoutes;
