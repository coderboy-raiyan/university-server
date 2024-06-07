import { Schema, model } from 'mongoose';
import SemesterRegistrationConstants from './semesterRegistration.constant';
import { TSemesterRegistrationSemester } from './semesterRegistration.interface';

const semesterRegistrationSchema = new Schema<TSemesterRegistrationSemester>({
    academicSemester: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: true,
        ref: 'AcademicSemester',
    },
    status: {
        type: String,
        enum: SemesterRegistrationConstants.SemesterRegistrationStatus,
        default: 'UPCOMING',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    minCredit: {
        type: Number,
        required: true,
    },
    maxCredit: {
        type: Number,
        required: true,
    },
});

const SemesterRegistration = model('SemesterRegistration', semesterRegistrationSchema);

export default SemesterRegistration;
