/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import UserConstants from './user.constant';

export type TUser = {
    id: string;
    password: string;
    needsPasswordChange?: boolean;
    passwordChangedAt?: Date;
    role: 'admin' | 'student' | 'faculty';
    isDeleted?: boolean;
    status?: 'in-progress' | 'blocked';
};

export type TUserRole = keyof typeof UserConstants.USER_ROLE_ENUM;

export type TUserModel = Model<TUser> & {
    isUserExistsByCustomId(id: string): Promise<TUser>;
    isPasswordMatched(plainText: string, hashPass: string): Promise<boolean>;
};
