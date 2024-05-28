const Role = ['admin', 'student', 'faculty'] as const;

const Status = ['in-progress', 'blocked'] as const;

const UserConstant = {
    Role,
    Status,
};

export default UserConstant;
