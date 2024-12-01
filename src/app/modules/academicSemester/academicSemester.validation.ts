import { z } from "zod";

const createAcademicSemesterValidationSchema = z.object({
  body:z.object({
    name:z.enum(['Autum','Summer','Fall'])
  })
})

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema
}