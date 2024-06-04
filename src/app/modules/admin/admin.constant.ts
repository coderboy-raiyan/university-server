const Gender = ['male', 'female'] as const;

const AdminSearchAbleFields = ['name.firstName', 'email', 'presentAddress'];
const AdminConstants = {
    Gender,
    AdminSearchAbleFields,
};

export default AdminConstants;
