import { z } from 'zod';

const createPreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
});

const updatePreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
    isDeleted: z.boolean(),
});

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(createPreRequisiteCourseValidationSchema).optional(),
    }),
});
const updateCourseValidationSchema = z.object({
    body: z.object({
        title: z.string().optional(),
        prefix: z.string().optional(),
        code: z.number().optional(),
        credits: z.number().optional(),
        preRequisiteCourses: z.array(updatePreRequisiteCourseValidationSchema).optional(),
    }),
});

const facultiesWithCourseValidationSchema = z.object({
    body: z.object({
        faculties: z.array(z.string()),
    }),
});

const CourseValidations = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
    facultiesWithCourseValidationSchema,
};

export default CourseValidations;
