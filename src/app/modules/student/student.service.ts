import StudentModel from './student.model';

const getAllStudentsFromDB = async () => {
    const result = await StudentModel.find({});
    return result;
};
const getSingleStudentsFromDB = async (id: string) => {
    const result = await StudentModel.findOne({ _id: id });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
};
