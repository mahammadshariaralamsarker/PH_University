import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/CatchAsync';
import { StatusCodes } from 'http-status-codes';

const createStudent = catchAsync(async (req, res) => {
  const { password, studentData } = req.body;
  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student is created successfully',
    data: result,
  });
});
const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created successfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created successfully',
    data: result,
  });
});


export const UserControllers = {
  createStudent,
  createAdmin,
  createFaculty,
};
