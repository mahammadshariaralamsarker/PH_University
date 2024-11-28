/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, Response } from "express";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const notFound = (req:Request,res:Response,next:NextFunction)=>{
  return res.status(404).json({
    status:false,
    message:'API Not Found',
    error:''

  })
}