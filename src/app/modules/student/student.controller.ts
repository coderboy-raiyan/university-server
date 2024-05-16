import { Request, Response } from 'express';
import { StudentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
    try {
        const { student: studentData } = req.body;
        const result = await StudentServices.createStudentIntoDB(studentData);
        return res
            .status(200)
            .json({ success: true, message: 'Student created successfully', data: result });
    } catch (error) {
        console.log(error);
    }
};
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        return res
            .status(200)
            .json({ success: true, message: 'Students retrieved successfully', data: result });
    } catch (error) {
        console.log(error);
    }
};
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { id: studentId } = req.params;
        const result = await StudentServices.getSingleStudentsFromDB(studentId);
        return res
            .status(200)
            .json({ success: true, message: 'Student retrieved successfully', data: result });
    } catch (error) {
        console.log(error);
    }
};

export const StudentControllers = {
    createStudent,
    getAllStudents,
    getSingleStudent,
};
