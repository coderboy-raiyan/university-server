import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { config } from '../../config';
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, parseInt(config.BCRYPT_SALT_ROUNDS));
    }
    next();
});

userSchema.post('save', function (doc, next) {
    doc.password = null;
    next();
});

const User = model<TUser>('User', userSchema);

export default User;
