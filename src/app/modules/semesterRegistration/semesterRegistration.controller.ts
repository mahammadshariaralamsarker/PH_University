import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from 'http-status-codes';
import { SemesterRegistrationService } from "./semesterRegistration.service";



const createsemesterRegistration = catchAsync(
  async(req:Request,res:Response)=>{  
    const result = await  SemesterRegistrationService.createServiceRegistrationIntoDB(req.body)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration is Created successfully',
      data: result,
    });
  }
)


export const SemesterRegistrationController = {
  createsemesterRegistration
}