import { z } from 'zod';

const academicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be String',
      required_error: 'Name must be given ',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be String',
      required_error: 'academic Faculty must be given ',
    }),
  }),
});

const UpdateacademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic Department must be String',
      required_error: 'Name must be given ',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic Department must be String',
      required_error: 'academic Faculty must be given ',
    }),
  }),
});

export const AcademicDepartmentValidation = {
  academicDepartmentValidationSchema,
  UpdateacademicDepartmentValidationSchema,
};
