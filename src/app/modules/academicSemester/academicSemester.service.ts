import { academicSemesterCodeNameCodeMapper } from './academicSemester.const';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterCodeNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid Semester code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};
const getAllAcademicSemesterInformation = async()=>{
  const result = await AcademicSemester.find()
  return result
}
const getSingleAcademicInformation = async(id:string)=>{
  const result = await AcademicSemester.findById(id)
  return result
}
const updateSingleAcademicInformation = async(id:string,payload:Partial<TAcademicSemester>)=>{
  if(payload.name && payload.code && academicSemesterCodeNameCodeMapper[payload.name] !==payload.code){
    throw new Error ("Invalid semester code ")
  }
  const result = await AcademicSemester.findOneAndUpdate({_id:id},payload,{new:true})
  return result
}

export const academicServices = {
  createAcademicSemesterIntoDB,
 getAllAcademicSemesterInformation,
 getSingleAcademicInformation,updateSingleAcademicInformation
};
