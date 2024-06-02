import { Schema, model } from 'mongoose';
import { TFaculty, TFacultyName } from './faculty.interface';

const facultyNameSchema = new Schema<TFacultyName>({
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

const facultySchema = new Schema<TFaculty>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: facultyNameSchema,
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
        designation: {
            type: String,
            required: true,
        },

        emergencyContactNo: {
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
        academicFaculty: {
            type: Schema.Types.ObjectId,
            ref: 'AcademicFaculty',
            required: true,
        },
        academicDepartment: {
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

facultySchema.pre('find', function () {
    this.find({ isDeleted: { $ne: true } });
});

facultySchema.pre('findOne', function () {
    this.findOne({ isDeleted: { $ne: true } });
});
facultySchema.pre('findOneAndUpdate', function () {
    this.findOne({ isDeleted: { $ne: true } });
});

const Faculty = model('Faculty', facultySchema);

export default Faculty;
