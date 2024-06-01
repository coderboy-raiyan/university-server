const Gender = ['male', 'female'] as const;

const StudentSearchAbleFields = ['name.firstName', 'email', 'presentAddress'];
const StudentConstant = {
    Gender,
    StudentSearchAbleFields,
};

export default StudentConstant;
