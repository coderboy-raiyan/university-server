const Role = ['admin', 'student', 'faculty'] as const;

const Status = ['in-progress', 'blocked'] as const;

const UserConstants = {
    Role,
    Status,
};

export default UserConstants;
