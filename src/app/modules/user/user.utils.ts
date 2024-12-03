import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentID = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'students',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({ createdAt: -1 })
    .lean();
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  let currentID = (0).toString(); //0000 by default
  const lastStudentID = await findLastStudentID();
  const lastStudentYear = lastStudentID?.substring(0, 4);
  const lastStudentSemesterCode = lastStudentID?.substring(4, 6);
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;
  if (
    lastStudentID &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentID = lastStudentID.substring(6);
  }
  let incrementID = (parseInt(currentID) + 1).toString().padStart(4, '0');
  incrementID = `${payload.year}${payload.code}${incrementID}`;
  return incrementID;
};
