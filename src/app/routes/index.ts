import express from 'express';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoute as AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { FacultyRoutes } from '../modules/faculty/faculty.router';
import { CourseRoute } from '../modules/Course/course.route';
import { SemesterRegistrationRoute } from '../modules/semesterRegistration/semesterRegistration.route';
import { OfferedCourseRoute } from '../modules/offeredCourse/offeredCourse.route';
import { AuthRoute } from '../modules/Auth/auth.route';

const router = express.Router();
const moduleRoutes = [
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculties',
    route: AcademicFacultyRoute,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoute,
  },
  {
    path: '/faculties',
    route: FacultyRoutes,
  },
  {
    path: '/courses',
    route: CourseRoute,
  },
  {
    path: '/semester-registrations',
    route: SemesterRegistrationRoute,
  },
  {
    path: '/offered-course',
    route: OfferedCourseRoute,
  },
  {
    path: '/auth',
    route: AuthRoute,
  },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
