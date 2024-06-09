import { z } from 'zod';
import OfferedCourseConstants from './offeredCourse.constant';

const timeStringSchema = z.string().refine(
    (time) => {
        const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
        return timeRegex.test(time);
    },
    { message: 'Invalid time format HH:MM in 24 hours format!' }
);

const createOfferedCourseValidation = z.object({
    body: z
        .object({
            semesterRegistration: z.string(),
            academicFaculty: z.string(),
            academicDepartment: z.string(),
            course: z.string(),
            faculty: z.string(),
            maxCapacity: z.number().optional(),
            section: z.number(),
            days: z.array(z.enum(OfferedCourseConstants.Days as [string, ...string[]])),
            startTime: timeStringSchema,
            endTime: timeStringSchema,
        })
        .refine(
            ({ startTime, endTime }) => {
                const start = new Date(`1970-01-01T${startTime}:00`);
                const end = new Date(`1970-01-01T${endTime}:00`);
                return end > start;
            },
            { message: 'Start time should be before end time!', path: ['startTime endTime'] }
        ),
});
const updateOfferedCourseValidation = z.object({
    body: z
        .object({
            faculty: z.string().optional(),
            maxCapacity: z.number().optional(),
            days: z.enum(OfferedCourseConstants.Days as [string, ...string[]]).optional(),
            startTime: timeStringSchema.optional(),
            endTime: timeStringSchema.optional(),
        })
        .refine(({ startTime, endTime }) => (startTime && endTime) || (!startTime && !endTime), {
            message: 'Both start time and end time should be provided',
        })
        .refine(
            ({ startTime, endTime }) => {
                if (startTime && endTime) {
                    const start = new Date(`1970-01-01T${startTime}:00`);
                    const end = new Date(`1970-01-01T${endTime}:00`);
                    return end > start;
                }
                return true;
            },
            { message: 'Start time should be before end time!', path: ['startTime endTime'] }
        ),
});

const OfferedCourseValidations = {
    createOfferedCourseValidation,
    updateOfferedCourseValidation,
};

export default OfferedCourseValidations;
