import { Schema, model } from 'mongoose';
import { TCourse, TCourseFaculty } from './course.interface';

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    prefix: {
        type: String,
        required: true,
        trim: true,
    },
    code: {
        type: Number,
        required: true,
    },
    credits: {
        type: Number,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    preRequisiteCourses: [
        {
            course: {
                type: Schema.Types.ObjectId,
                ref: 'Course',
            },
            isDeleted: {
                type: Boolean,
                default: false,
            },
        },
    ],
});

courseSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});
courseSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } });
    next();
});

// Course faculty Model
const courseFacultySchema = new Schema<TCourseFaculty>(
    {
        course: {
            type: Schema.Types.ObjectId,
            unique: true,
            ref: 'Course',
            required: true,
        },
        faculties: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Faculty',
            },
        ],
    },
    { timestamps: true }
);

const Course = model<TCourse>('Course', courseSchema);
export const CourseFaculty = model<TCourseFaculty>('CourseFaculty', courseFacultySchema);

export default Course;
