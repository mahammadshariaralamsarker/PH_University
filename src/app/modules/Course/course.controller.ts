import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/CatchAsync';
import { CourseServices } from './course.service';
import { sendResponse } from '../../utils/sendResponse';

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
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
  const result = await CourseServices.getSingleCoursesFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Course is Here Successfully',
    data: result,
  });
});
const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Course Deleted Successfully',
    data: result,
  });
});
const asignFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.asignFacultieswithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties Assinged Successfully',
    data: result,
  });
});
const removeFacultiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultieswithCourseIntoDB(
    courseId,
    faculties,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculties Removed Successfully',
    data: result,
  });
});

const UpdatedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await CourseServices.updateCourseIntoDB(id, payload);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Academic Faculty Updated Successfully',
    data: result,
  });
});
export const CourseControllers = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  UpdatedCourse,
  asignFacultiesWithCourse,
  removeFacultiesWithCourse,
};
