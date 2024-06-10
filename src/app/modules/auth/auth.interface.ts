import { TUserRole } from '../user/user.interface';

export type TLoginUser = {
    id: string;
    password: string;
};

export type TChangePasswordPayload = {
    id: string;
    role: TUserRole;
    password: string;
    oldPassword: string;
    newPassword: string;
};
