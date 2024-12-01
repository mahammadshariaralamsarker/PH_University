import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB= async(payload:TAcademicSemester)=>{
  type TAcademicSemesterNameCodeMapper={
    [key:string]:string
  };
  const academicSemesterCodeNameCodeMapper:TAcademicSemesterNameCodeMapper={
    Autum:'01',
    Summer:'02',
    Fall:'03'
  }
  if(academicSemesterCodeNameCodeMapper [payload.name] !==payload.code){
    throw new Error ("Invalid Semester code");
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const  academicServices = {
  createAcademicSemesterIntoDB
}