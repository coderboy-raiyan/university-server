import Student from './student.model';

const getAllStudentsFromDB = async () => {
    const result = await Student.find({});
    return result;
};
const getSingleStudentsFromDB = async (id: string) => {
    const result = await Student.findOne({ _id: id });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
};
