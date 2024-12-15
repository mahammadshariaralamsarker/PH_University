import AppError from '../../Errors/AppErrors';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import httpstatus from 'http-status-codes';
import { hasTimeConflict } from './offeredCourse.utils';
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const {
    days,
    startTime,
    endTime,
    semesterRegistration,
    section,
    academicFaculty,
    academicDepartment,
    course,
    faculty,
  } = payload;

  const isSemesterRegistrationExits =
    await SemesterRegistration.findById(semesterRegistration);
  if (!isSemesterRegistrationExits) {
    throw new AppError(
      httpstatus.NOT_FOUND,
      'Semester Registration Not Found!',
    );
  }
  const academicSemester = isSemesterRegistrationExits.academicSemester;
  const isacademicFacultyExits =
    await AcademicFaculty.findById(academicFaculty);
  if (!isacademicFacultyExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Academic Faculty Not Found!');
  }

  const isacademicDepartmentExits =
    await AcademicDepartment.findById(academicDepartment);
  if (!isacademicDepartmentExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Academic Department Not Found!');
  }
  const isCourseExits = await Course.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Course  Not Found!');
  }

  const isFacultyExits = await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Faculty  Not Found!');
  }

  // check if the the department is belong to the faculty
  const isDepartmentBelongToFaculty = await AcademicDepartment.findOne({
    _id: academicDepartment,
    academicFaculty,
  });
  if (!isDepartmentBelongToFaculty) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `This ${isacademicDepartmentExits.name} is not belong to ${isacademicFacultyExits.name}`,
    );
  }
  // check if the same course same section in same registered semester exists
  const isSameOfferedCourseExistWtihSameRegisteredSemesterWithSameSection =
    await OfferedCourse.findOne({
      semesterRegistration,
      section,
      course,
    });
  if (isSameOfferedCourseExistWtihSameRegisteredSemesterWithSameSection) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `Offered Course with Same Section already exists`,
    );
  }
  //  get the schedule of the faculty
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `The Faculty is not available ata that time! Choose other time or day !`,
    );
  }

  const result = await OfferedCourse.create({ ...payload, academicSemester });
  return result;
};

const updateOfferedCourseFromDB = async (
  id: string,
  payload: Pick<TOfferedCourse, 'faculty' | 'days' | 'startTime' | 'endTime'>,
) => {
  const { faculty, days, startTime, endTime } = payload;
  const isFacultyExits = await Faculty.findById(faculty);
  const isOfferedCourseExists = await OfferedCourse.findById(id);
  if (!isOfferedCourseExists) {
    throw new AppError(httpstatus.NOT_FOUND, 'Offered Course Not Found!');
  }
  if (!isFacultyExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Faculty Not Found!');
  }
  const semesterRegistration = isOfferedCourseExists.semesterRegistration;
  const semesterRegistrationStatus =
    await SemesterRegistration.findById(semesterRegistration);
    if (semesterRegistrationStatus?.status==="UPCOMING") {
      throw new AppError(httpstatus.BAD_REQUEST, 'You cannot update this offered course');
    }
  const assignSchedules = await OfferedCourse.find({
    semesterRegistration,
    faculty,
    days: { $in: days },
  }).select('days startTime endTime');

  const newSchedule = {
    days,
    startTime,
    endTime,
  };
  if (hasTimeConflict(assignSchedules, newSchedule)) {
    throw new AppError(
      httpstatus.BAD_REQUEST,
      `The Faculty is not available ata that time! Choose other time or day !`,
    );
  }
  const result = await OfferedCourse.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getSingleOfferedCourseFromDB = async (id: string) => {
  const result = await OfferedCourse.findById(id) ;
  return result;
}; 
const getAllOfferedCourseFromDB = async ( ) => {
  const result = await OfferedCourse.find() ;
  return result;
}; 

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
  updateOfferedCourseFromDB,getSingleOfferedCourseFromDB,getAllOfferedCourseFromDB
};
