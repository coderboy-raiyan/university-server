import { z } from 'zod';
import AcademicSemesterConstants from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(AcademicSemesterConstants.SemesterName as [string, ...string[]]),
        code: z.enum(AcademicSemesterConstants.SemesterCode as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum(AcademicSemesterConstants.Months as [string, ...string[]]),
        endMonth: z.enum(AcademicSemesterConstants.Months as [string, ...string[]]),
    }),
});
const updateAcademicSemesterValidationSchema = z.object({
    body: z
        .object({
            name: z
                .enum(AcademicSemesterConstants.SemesterName as [string, ...string[]])
                .optional(),
            code: z
                .enum(AcademicSemesterConstants.SemesterCode as [string, ...string[]])
                .optional(),
            year: z.string().optional(),
            startMonth: z
                .enum(AcademicSemesterConstants.Months as [string, ...string[]])
                .optional(),
            endMonth: z.enum(AcademicSemesterConstants.Months as [string, ...string[]]).optional(),
        })
        .refine((data) => (data.code && data.name) || (!data.name && !data.code), {
            message: 'Both name and code is required',
            path: ['code', 'name'],
        }),
});

const AcademicSemesterValidations = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};

export default AcademicSemesterValidations;
