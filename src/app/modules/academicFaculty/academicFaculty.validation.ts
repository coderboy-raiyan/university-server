import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({ invalid_type_error: 'Academic Faculty must be string' }),
    }),
});

const AcademicFacultyValidation = {
    createAcademicFacultyValidationSchema,
};

export default AcademicFacultyValidation;
