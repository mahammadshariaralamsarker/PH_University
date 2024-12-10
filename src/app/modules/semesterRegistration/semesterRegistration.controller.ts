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
const getAllsemesterRegistration = catchAsync(
  async(req:Request,res:Response)=>{  

  const result = await SemesterRegistrationService.getAllSemesterRegistrationFromDB(req.query)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester all Retrieved  successfully',
      data: result,
    });
  }
)
const getSinglesemesterRegistration = catchAsync(
  async(req:Request,res:Response)=>{  
    const {id} = req.params
  const result = await SemesterRegistrationService.getSingleSemesterRegistrationFromDB(id)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Registration single Retrieved  successfully',
      data: result,
    });
  }
)
const updateSemesterRegistration = catchAsync(
  async(req:Request,res:Response)=>{  
    const {id} = req.params
    const {payload} = req.body
  const result = await SemesterRegistrationService.updateSemesterRegistrationIntoDB(id,payload)
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Semester Updated successfully',
      data: result,
    });
  }
)


export const SemesterRegistrationController = {
  createsemesterRegistration,getAllsemesterRegistration,getSinglesemesterRegistration,updateSemesterRegistration
}