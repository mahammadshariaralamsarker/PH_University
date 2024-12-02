import { TacademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFacultyIntoDB = async (payload: TacademicFaculty) => {
  const result = await AcademicFaculty.create(payload);
  return result;
};
const getAllAcademicFacultyFromDB = async () => {
  const result = await AcademicFaculty.find();
  return result;
};
const getSingleAcademicFacultyFromDB = async (id: string) => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const UpdateAcademicFacultyIntoDB = async (
  id: string,
  payload: Partial<TacademicFaculty>,
) => {
  const result = await AcademicFaculty.findByIdAndUpdate({_id:id}, payload,{new:true});
  return result;
};
export const academicFacultyServices = {
  createAcademicFacultyIntoDB,
  getAllAcademicFacultyFromDB,
  getSingleAcademicFacultyFromDB,
  UpdateAcademicFacultyIntoDB,
};
