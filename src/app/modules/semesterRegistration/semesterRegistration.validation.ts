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
const updateSemesterRegistrationValidationSchema = z.object({
    body: z.object({
        academicSemester: z.string().optional(),
        status: z
            .enum(SemesterRegistrationConstants.SemesterRegistrationStatus as [string, ...string[]])
            .optional(),
        startDate: z.string().datetime().optional(),
        endDate: z.string().datetime().optional(),
        minCredit: z.number().optional(),
        maxCredit: z.number().optional(),
    }),
});

const SemesterRegistrationValidations = {
    createSemesterRegistrationValidationSchema,
    updateSemesterRegistrationValidationSchema,
};

export default SemesterRegistrationValidations;
