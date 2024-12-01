/* eslint-disable @typescript-eslint/no-explicit-any */
import { sendResponse } from "../../utils/sendResponse"; 
import { catchAsync } from "../../utils/CatchAsync";



const createAcademicSemester = catchAsync(async (req, res) => {
  // const {password, student: studentData } = req.body;
  // const result = await UserService.createStudentIntoDB(password,studentData);
    sendResponse(res, {
    success:true,
    statusCode:200,
    message:'Student is created successfully',
    data:result
  })

});
export const AcademicSemesterController = {
  createAcademicSemester
}