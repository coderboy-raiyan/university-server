import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';

const router = Router();

const routers = [
    {
        path: '/students',
        route: StudentRoutes,
    },
];

routers.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
