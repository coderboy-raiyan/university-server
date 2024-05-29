import Student from './student.model';

const getAllStudentsFromDB = async () => {
    const result = await Student.find({})
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};
const getSingleStudentsFromDB = async (id: string) => {
    const result = await Student.findOne({ _id: id })
        .populate('admissionSemester')
        .populate({
            path: 'academicDepartment',
            populate: {
                path: 'academicFaculty',
            },
        });
    return result;
};

export const StudentServices = {
    getAllStudentsFromDB,
    getSingleStudentsFromDB,
};
