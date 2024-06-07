import { z } from 'zod';
import SemesterRegistrationConstants from './semesterRegistration.constant';

const createSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string(),
        status: z
            .enum(SemesterRegistrationConstants.SemesterRegistrationStatus as [string, ...string[]])
            .optional(),
        startDate: z.string().datetime(),
        endDate: z.string().datetime(),
        minCredit: z.number(),
        maxCredit: z.number(),
    }),
});

const SemesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema,
};

export default SemesterRegistrationValidations;
