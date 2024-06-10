const Role = ['admin', 'student', 'faculty'] as const;

const Status = ['in-progress', 'blocked'] as const;

const USER_ROLE_ENUM = {
    admin: 'admin',
    student: 'student',
    faculty: 'faculty',
} as const;

const UserConstants = {
    Role,
    Status,
    USER_ROLE_ENUM,
};

export default UserConstants;
