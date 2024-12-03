import { TacademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = (payload: TacademicDepartment) => {
  const result = AcademicDepartment.create(payload);
  return result;
};
const getSingleAcademicDepartment = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const getAllAcademicDepartment = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const updateAcademicDepartment = async (
  departmentID: string,
  payload: Partial<TacademicDepartment>,
) => {
  const result = await AcademicDepartment.findByIdAndUpdate(
    { _id: departmentID },
    payload,
    { new: true },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartment,
  getSingleAcademicDepartment,
  getAllAcademicDepartment,
  updateAcademicDepartment,
};
