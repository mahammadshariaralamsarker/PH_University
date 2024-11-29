/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createStudent = async (req: Request, res: Response,next:NextFunction) => {
  try {
    const {password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);
    const result = await UserService.createStudentIntoDB(password,studentData);
      sendResponse(res, {
      success:true,
      statusCode:200,
      message:'Student is created successfully',
      data:result
    })
  } catch (err) {
    next(err)
  }
};
export const UserControllers = {
  createStudent
}