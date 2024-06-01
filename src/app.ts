import express, { Application } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/v1/test', async (req, res) => {
    res.status(httpStatus.OK).json({ success: true, message: 'Server is healthy' });
});

app.use('/api/v1', router);

// not found
app.use(notFound);

// globalErrorHandler
app.use(globalErrorHandler);

export default app;
