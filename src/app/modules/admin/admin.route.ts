import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminController from './admin.controller';
import AdminValidation from './admin.validation';

const router = Router();

router.get('/', AdminController.getAllAdmins);
router.get('/:adminId', AdminController.getSingleAdmin);
router.patch(
    '/:adminId',
    validateRequest(AdminValidation.updateAdminValidationSchema),
    AdminController.updateAdmin
);
router.delete('/:adminId', AdminController.deleteAdmin);

const AdminRoutes = router;

export default AdminRoutes;
