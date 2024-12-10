/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import AppError from '../../Errors/AppErrors';
import { TsemesterRegistration } from './semesterRegistration.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../Builder/QueryBuilder';

const createServiceRegistrationIntoDB = async (
  payload: TsemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester Already Exists');
  }
  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);

  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester Not Found!',
    );
  }
  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find().populate('academicSemester') ,
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async(id:string) =>{
  const result = await SemesterRegistration.findById(id)
  return result
}


export const SemesterRegistrationService = {
  createServiceRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,getSingleSemesterRegistrationFromDB
};
