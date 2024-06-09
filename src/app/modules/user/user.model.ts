import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { config } from '../../config';
import UserConstants from './user.constant';
import { TUser, TUserModel } from './user.interface';

const userSchema = new Schema<TUser, TUserModel>(
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
            enum: UserConstants.Role,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: UserConstants.Status,
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

userSchema.statics.isUserExistsByCustomId = async function (id: string) {
    const isExists = await this.findOne({ id });
    return isExists;
};
userSchema.statics.isPasswordMatched = async function (plainText: string, hashPass: string) {
    const isMatched = await bcrypt.compare(plainText, hashPass);
    return isMatched;
};

const User = model<TUser, TUserModel>('User', userSchema);

export default User;
