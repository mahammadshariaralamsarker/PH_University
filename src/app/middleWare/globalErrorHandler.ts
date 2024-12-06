/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
// import { TErrorSource } from '../interface/error';

type TErrorSource = {
  path:string|number
  message:string
}[]

export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting getting values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorSources:TErrorSource = [{
    path:'',
    message:'Error Sources message'
  }]

  const handleZodError =(err:ZodError)=>{
    const errorSources:TErrorSource= err.issues.map((issue:ZodError)=>{
      return{
        path:issue?.path[issue.path.length-1],
        message:issue.message
      }
    })
    return {
      statusCode,
      message:'Validation Error',
      errorSources
    }
  }


  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }

// ultimate Return
  return res.status(statusCode).json({
    status: false,
    message,
    errorSources,
    stack:config.Node_Env ==='development'?err?.stack:null
  });
};
