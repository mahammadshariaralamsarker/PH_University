import { RequestHandler } from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/CatchAsync';
import { StatusCodes } from 'http-status-codes';

const getAllStudents = catchAsync(async (req, res) => {
  const result = await StudentServices.getAllStudentsFromDB(req.query);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'All Student Received successfully',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await StudentServices.getSingleStudentFromDB(Id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Single Student get successfully',
    data: result,
  });
});
const deleteStudent: RequestHandler = catchAsync(async (req, res) => {
  const { Id } = req.params;
  const result = await StudentServices.deleteStudentFromDB(Id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student deleted successfully',
    data: result,
  });
});
const updateStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId: Id } = req.params;
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(Id, student);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student update successfully',
    data: result,
  });
});

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
