import { z } from 'zod';

const createPreRequisiteCourseValidationSchema = z.object({
    course: z.string(),
});

const updatePreRequisiteCourseValidationSchema = z.object({
    course: z.string().optional(),
    isDeleted: z.boolean().optional(),
});

const createCourseValidationSchema = z.object({
    body: z.object({
        title: z.string(),
        prefix: z.string(),
        code: z.number(),
        credits: z.number(),
        preRequisiteCourses: z.array(createPreRequisiteCourseValidationSchema),
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

const CourseValidation = {
    createCourseValidationSchema,
    updateCourseValidationSchema,
};

export default CourseValidation;
