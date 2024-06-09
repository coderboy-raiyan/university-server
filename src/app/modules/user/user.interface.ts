/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange?: boolean;
    role: 'admin' | 'student' | 'faculty';
    isDeleted?: boolean;
    status?: 'in-progress' | 'blocked';
};

export type TUserModel = Model<TUser> & {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainText: string, hashPass: string): Promise<boolean>;
};
