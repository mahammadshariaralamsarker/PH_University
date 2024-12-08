import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/CatchAsync';
import { CourseServices } from './course.service';
import { sendResponse } from '../../utils/sendResponse'; 

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course is Created Successfully',
    data: result,
  });
});
const getAllCourses = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCoursesFromDB(req.query);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Courses All is Here Successfully',
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =await CourseServices.getSingleCoursesFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Course is Here Successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Deleted Successfully',
    data: result,
  });
});
// const getUpdatedAcademicFaculty = catchAsync(async (req, res) => {
//   const { facultyID } = req.params;
//   const payload = req.body;
//   const result = await academicFacultyServices.UpdateAcademicFacultyIntoDB(
//     facultyID,
//     payload,
//   );
//   sendResponse(res, {
//     statusCode: StatusCodes.OK,
//     success: true,
//     message: ' Academic Faculty Updated Successfully',
//     data: result,
//   });
// });

export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,deleteCourse
};
