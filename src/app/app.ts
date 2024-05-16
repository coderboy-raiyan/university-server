import express, { Application } from 'express';
import httpStatus from 'http-status';
import router from './router';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(httpStatus.OK).json({ success: true, message: 'Server is healthy' });
});

app.use('/api/v1', router);

export default app;
