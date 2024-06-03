import { Schema, model } from 'mongoose';
import { TAdmin, TAdminName } from './admin.interface';

const AdminNameSchema = new Schema<TAdminName>({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
});

const AdminSchema = new Schema<TAdmin>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: AdminNameSchema,
            required: true,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },
        gender: {
            type: String,
            enum: {
                values: ['male', 'female'],
                message: '{VALUE} is not valid. Gender must be male or female',
            },
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        presentAddress: {
            type: String,
            required: true,
        },
        permanentAddress: {
            type: String,
            required: true,
        },

        managementDepartment: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
            required: true,
        },
        profileImg: {
            type: String,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

AdminSchema.pre('find', function () {
    this.find({ isDeleted: { $ne: true } });
});

AdminSchema.pre('findOne', function () {
    this.findOne({ isDeleted: { $ne: true } });
});
AdminSchema.pre('findOneAndUpdate', function () {
    this.findOne({ isDeleted: { $ne: true } });
});

const Admin = model('Admin', AdminSchema);

export default Admin;
