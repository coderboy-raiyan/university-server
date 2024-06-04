import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import AdminController from './admin.controller';
import AdminValidation from './admin.validation';

const router = Router();

router.get('/', AdminController.getAllAdmins);
router.get('/:id', AdminController.getSingleAdmin);
router.patch(
    '/:id',
    validateRequest(AdminValidation.updateAdminValidationSchema),
    AdminController.updateAdmin
);
router.delete('/:id', AdminController.deleteAdmin);

const AdminRoutes = router;

export default AdminRoutes;
