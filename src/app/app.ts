import express, { Application } from 'express';
import httpStatus from 'http-status';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(httpStatus.OK).json({ success: true, message: 'Server is healthy' });
});

export default app;
