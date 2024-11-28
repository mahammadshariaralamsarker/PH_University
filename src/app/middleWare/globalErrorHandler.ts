/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const globalErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{
  const statusCode =500; 
  const message =err.message|| 'something went wrong'
  return res.status(statusCode).json({
    status:false,
    message,
    error:err

  })
}