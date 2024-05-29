import { z } from 'zod';
import AcademicSemesterConstant from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum(AcademicSemesterConstant.SemesterName as [string, ...string[]]),
        code: z.enum(AcademicSemesterConstant.SemesterCode as [string, ...string[]]),
        year: z.string(),
        startMonth: z.enum(AcademicSemesterConstant.Months as [string, ...string[]]),
        endMonth: z.enum(AcademicSemesterConstant.Months as [string, ...string[]]),
    }),
});
const updateAcademicSemesterValidationSchema = z.object({
    body: z
        .object({
            name: z.enum(AcademicSemesterConstant.SemesterName as [string, ...string[]]).optional(),
            code: z.enum(AcademicSemesterConstant.SemesterCode as [string, ...string[]]).optional(),
            year: z.string().optional(),
            startMonth: z.enum(AcademicSemesterConstant.Months as [string, ...string[]]).optional(),
            endMonth: z.enum(AcademicSemesterConstant.Months as [string, ...string[]]).optional(),
        })
        .refine((data) => (data.code && data.name) || (!data.name && !data.code), {
            message: 'Both name and code is required',
        }),
});

const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
    updateAcademicSemesterValidationSchema,
};

export default AcademicSemesterValidation;
