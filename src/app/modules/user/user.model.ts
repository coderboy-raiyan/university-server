import { Schema, model } from 'mongoose';

import UserConstant from './user.constant';
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        needsPasswordChange: {
            type: Boolean,
            default: true,
        },
        role: {
            type: String,
            enum: UserConstant.Role,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: UserConstant.Status,
            default: 'in-progress',
        },
    },
    { timestamps: true }
);

const User = model<TUser>('User', userSchema);

export default User;
