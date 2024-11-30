/* eslint-disable @typescript-eslint/no-explicit-any */

import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { RequestHandler } from "express";
import { catchAsync } from "../../utils/CatchAsync";



const createStudent :RequestHandler= catchAsync(async (req, res) => {
  const {password, student: studentData } = req.body;
  // const zodParsedData = studentValidationSchema.parse(studentData);
  const result = await UserService.createStudentIntoDB(password,studentData);
    sendResponse(res, {
    success:true,
    statusCode:200,
    message:'Student is created successfully',
    data:result
  })

});
export const UserControllers = {
  createStudent
}