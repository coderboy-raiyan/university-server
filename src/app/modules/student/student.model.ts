import mongoose from 'mongoose';
import { TGuardian, TLocalGuardian, TStudent, TUserName } from './student.interface';

const localGuardianSchema = new mongoose.Schema<TLocalGuardian>({
    name: {
        type: String,
        required: true,
    },
    occupation: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
});

const studentUserNameSchema = new mongoose.Schema<TUserName>({
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
const guardianSchema = new mongoose.Schema<TGuardian>({
    fatherName: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    fatherOccupation: {
        type: String,
    },
    motherOccupation: {
        type: String,
    },
    fatherContactNo: {
        type: String,
        required: true,
    },
    motherContactNo: {
        type: String,
        required: true,
    },
});

const studentSchema = new mongoose.Schema<TStudent>(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: studentUserNameSchema,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true,
            required: true,
        },
        admissionSemester: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AcademicSemester',
            required: true,
        },
        academicDepartment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AcademicDepartment',
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
        guardian: {
            type: guardianSchema,
            required: true,
        },
        localGuardian: {
            type: localGuardianSchema,
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

const Student = mongoose.model<TStudent>('Student', studentSchema);

export default Student;
