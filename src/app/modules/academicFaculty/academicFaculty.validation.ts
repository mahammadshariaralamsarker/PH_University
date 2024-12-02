import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be String',
    }),
  }),
});

const UpdateacademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Faculty must be String',
    }),
  }),
});

export const AcademicFacultyValidation = {
  academicFacultyValidationSchema,
  UpdateacademicFacultyValidationSchema,
};
