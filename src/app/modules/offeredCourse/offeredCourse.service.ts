import AppError from '../../Errors/AppErrors';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Course } from '../Course/course.model';
import { Faculty } from '../faculty/faculty.model';
import { SemesterRegistration } from '../semesterRegistration/semesterRegistration.model';
import { TOfferedCourse } from './offeredCourse.interface';
import { OfferedCourse } from './offeredCourse.model';
import httpstatus from 'http-status-codes';
const createOfferedCourseIntoDB = async (payload: TOfferedCourse) => {
  const { semesterRegistration, academicFaculty, academicDepartment, course,faculty } =
    payload;
  
    const isSemesterRegistrationExits =await SemesterRegistration.findById(semesterRegistration);
    if (!isSemesterRegistrationExits) {
      throw new AppError(httpstatus.NOT_FOUND, 'Semester Registration Not Found!');
    }
  const academicSemester = isSemesterRegistrationExits.academicSemester
    const isacademicFacultyExits =await AcademicFaculty.findById(academicFaculty);
  if (!isacademicFacultyExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Academic Faculty Not Found!');
  }

  const isacademicDepartmentExits =await AcademicDepartment.findById(academicDepartment);
  if (!isacademicDepartmentExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Academic Department Not Found!');
  }
  const isCourseExits =await Course.findById(course);
  if (!isCourseExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Course  Not Found!');
  }

  const isFacultyExits =await Faculty.findById(faculty);
  if (!isFacultyExits) {
    throw new AppError(httpstatus.NOT_FOUND, 'Faculty  Not Found!');
  }

  const result = await OfferedCourse.create({...payload,academicSemester});
  return result;
};

export const OfferedCourseService = {
  createOfferedCourseIntoDB,
};
