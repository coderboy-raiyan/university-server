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

const AcademicSemesterValidation = {
    createAcademicSemesterValidationSchema,
};

export default AcademicSemesterValidation;
