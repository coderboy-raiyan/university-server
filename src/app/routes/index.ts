import { Router } from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';

const router = Router();

const routers = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/students',
        route: StudentRoutes,
    },
];

routers.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
