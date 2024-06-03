const Gender = ['male', 'female'] as const;

const AdminSearchAbleFields = ['name.firstName', 'email', 'presentAddress'];
const AdminConstant = {
    Gender,
    AdminSearchAbleFields,
};

export default AdminConstant;
