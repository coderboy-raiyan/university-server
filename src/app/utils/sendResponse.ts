import { Response } from 'express';

type TData<T> = {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
};

function sendResponse<T>(res: Response, data: TData<T>) {
    return res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
    });
}

export default sendResponse;
