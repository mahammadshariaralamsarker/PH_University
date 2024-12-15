import { Request, Response } from "express";
import { catchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from 'http-status-codes'
import { OfferedCourseService } from "./offeredCourse.service";

const createOfferedCourse = catchAsync(async(req:Request,res:Response)=>{
  const result = await OfferedCourseService.createOfferedCourseIntoDB(req.body)
  sendResponse(res, {
    statusCode:httpstatus.OK,
    success:true,
    message:'Offered Course is Created Successfully',
    data:result
  })
})
const updateOfferedCourse = catchAsync(async(req:Request,res:Response)=>{
  const {id} = req.params 
  const result = await OfferedCourseService.updateOfferedCourseFromDB(id,req.body)
  sendResponse(res, {
    statusCode:httpstatus.OK,
    success:true,
    message:'Offered Course is Updated Successfully',
    data:result
  })
})

export  const OfferedCourseController ={
  createOfferedCourse,updateOfferedCourse
}