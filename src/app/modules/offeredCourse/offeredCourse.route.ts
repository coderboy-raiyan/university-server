import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import OfferedCourseControllers from './offeredCourse.controller';
import OfferedCourseValidations from './offeredCourse.validation';

const router = Router();

router.get('/', OfferedCourseControllers.getAllOfferedCourses);
router.get('/:id', OfferedCourseControllers.getSingleOfferedCourse);
router.post(
    '/create-offered-course',
    validateRequest(OfferedCourseValidations.createOfferedCourseValidation),
    OfferedCourseControllers.createOfferedCourse
);

router.patch(
    '/update-offered-course/:id',
    validateRequest(OfferedCourseValidations.updateOfferedCourseValidation),
    OfferedCourseControllers.updateOfferedCourse
);
router.delete('/:id', OfferedCourseControllers.deleteOfferedCourse);

const OfferedCourseRoutes = router;

export default OfferedCourseRoutes;
