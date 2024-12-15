/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status-codes';
import AppError from '../../Errors/AppErrors';
import { TsemesterRegistration } from './semesterRegistration.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { SemesterRegistration } from './semesterRegistration.model';
import QueryBuilder from '../../Builder/QueryBuilder';
import { RegistrationStatus } from './semesterRegistration.constant';
import mongoose from 'mongoose';
import { OfferedCourse } from '../offeredCourse/offeredCourse.model';

const createServiceRegistrationIntoDB = async (
  payload: TsemesterRegistration,
) => {
  const academicSemester = payload?.academicSemester;

  const isAcademicSemesterExists =
    await AcademicSemester.findById(academicSemester);
  if (!isAcademicSemesterExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This Academic Semester Not Found!',
    );
  }

  const isSemesterRegistrationExists = await SemesterRegistration.findOne({
    academicSemester,
  });
  if (isSemesterRegistrationExists) {
    throw new AppError(httpStatus.CONFLICT, 'This Semester Already Exists');
  }

  // check if there any registered semester that is already upcoming or ongoing
  const isthereAnyUpcomigSemester = await SemesterRegistration.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  });
  if (isthereAnyUpcomigSemester) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `There is already ${isthereAnyUpcomigSemester.status} Semester`,
    );
  }

  const result = await SemesterRegistration.create(payload);
  return result;
};

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistration.find() /* .populate('academicSemester') */,
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await semesterRegistrationQuery.modelQuery;
  return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistration.findById(id);
  return result;
};
const updateSemesterRegistrationIntoDB = async (
  id: string,
  payload: Partial<TsemesterRegistration>,
) => {
  // if the requested semester is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);
  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.CONFLICT,
      'There is no Semester in the database',
    );
  }
  const currentSemesterStatus = isSemesterRegistrationExists?.status;
  const requestedSemesterStatus = payload?.status;
  // if the requsted Semester status is ended we cannot the update this semister
  if (currentSemesterStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The Semester Already ${currentSemesterStatus}`,
    );
  }

  if (
    currentSemesterStatus === RegistrationStatus.ONGOING &&
    requestedSemesterStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You cannot Directly change status form ${currentSemesterStatus} to ${requestedSemesterStatus}`,
    );
  }
  const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
const deleteSemesterRegistrationFromDB = async (id: string) => {
  /** 
  * Step1: Delete associated offered courses.
  * Step2: Delete semester registraton when the status is 
  'UPCOMING'.
  **/

  // checking if the semester registration is exist
  const isSemesterRegistrationExists = await SemesterRegistration.findById(id);

  if (!isSemesterRegistrationExists) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'This registered semester is not found !',
    );
  }

  // checking if the status is still "UPCOMING"
  const semesterRegistrationStatus = isSemesterRegistrationExists.status;

  if (semesterRegistrationStatus !== 'UPCOMING') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `You can not update as the registered semester is ${semesterRegistrationStatus}`,
    );
  }

  const session = await mongoose.startSession();

  //deleting associated offered courses

  try {
    session.startTransaction();

    const deletedOfferedCourse = await OfferedCourse.deleteMany(
      {
        semesterRegistration: id,
      },
      {
        session,
      },
    );

    if (!deletedOfferedCourse) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    const deletedSemisterRegistration =
      await SemesterRegistration.findByIdAndDelete(id, {
        session,
        new: true,
      });

    if (!deletedSemisterRegistration) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to delete semester registration !',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return null;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const SemesterRegistrationService = {
  createServiceRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationIntoDB,
  deleteSemesterRegistrationFromDB,
};
