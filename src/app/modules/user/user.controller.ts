import { UserService } from './user.service';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/CatchAsync';
import { StatusCodes } from 'http-status-codes';
const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDB(password, studentData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Student is created successfully',
    data: result,
  });
});
export const UserControllers = {
  createStudent,
};
