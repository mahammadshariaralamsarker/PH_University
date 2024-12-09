import { z } from 'zod';
const preRequisiteCoursesValidationSchema = z.object({
  course: z.string(),
  isDeleted: z.boolean().optional(),
});
const createCourseValidationSchema = z.object({
  body: z.object({
    title: z.string(),
    prefix: z.string(),
    code: z.number(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(preRequisiteCoursesValidationSchema)
      .optional(),
    isDeleted: z.boolean().optional(),
  }),
});
 
const updatepreRequisiteCoursesValidationSchema = z.object({
  course: z.string().optional(),
  isDeleted: z.boolean().optional(),
});
const updatecreateCourseValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    prefix: z.string().optional(),
    code: z.number().optional(),
    credits: z.number(),
    preRequisiteCourses: z
      .array(updatepreRequisiteCoursesValidationSchema)
      .optional() ,
    isDeleted: z.boolean().optional() ,
  }),
});
 

export const CourseValidation = {
  createCourseValidationSchema,
  updatecreateCourseValidationSchema,
};
