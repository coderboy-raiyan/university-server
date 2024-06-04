const Gender = ['male', 'female'] as const;

const StudentSearchAbleFields = ['name.firstName', 'email', 'presentAddress'];
const StudentConstants = {
    Gender,
    StudentSearchAbleFields,
};

export default StudentConstants;
