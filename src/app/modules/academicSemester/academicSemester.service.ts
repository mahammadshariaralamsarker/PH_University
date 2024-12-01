import { academicSemesterCodeNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB= async(payload:TAcademicSemester)=>{
  
  
  if(academicSemesterCodeNameCodeMapper [payload.name] !==payload.code){
    throw new Error ("Invalid Semester code");
  }
  const result = await AcademicSemester.create(payload)
  return result
}

export const  academicServices = {
  createAcademicSemesterIntoDB
}