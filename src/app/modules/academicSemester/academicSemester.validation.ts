import { z } from "zod";
import { AcademicSemesterCode, AcademicSemesterName, Month } from "./academicSemester.const";

const createAcademicSemesterValidationSchema = z.object({
  body:z.object({
    name:z.enum([...AcademicSemesterName] as [string,...string[]] ),
    year:z.date(),
    code:z.enum([...AcademicSemesterCode] as [string,...string[]]),
    startMonth:z.enum([...Month] as [string,...string[]]),
    endMonth:z.enum([...Month] as [string,...string[]]),
  })
})

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema
}