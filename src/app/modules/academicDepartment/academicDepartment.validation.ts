import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic department must be string' }),
        academicFaculty: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
    }),
});
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic department must be string' }).optional(),
        academicFaculty: z
            .string({ invalid_type_error: 'Academic Faculty must be string' })
            .optional(),
    }),
});

const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema,
};

export default AcademicDepartmentValidation;
