/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { handleZodError } from '../Errors/handleZodError';
import {   TErrorSources } from '../interface/error';
import { handleMongooseValidationError } from '../Errors/handleMongooseValidationError';



export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  // setting getting values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong!';
  let errorSources:TErrorSources  = [{
    path:'',
    message:'Error Sources message'
  }]

  if(err instanceof ZodError){
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError?.StatusCodes;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }  
  else if(err?.name === 'ValidationError')  {
    const simplifiedError = handleMongooseValidationError(err)
    statusCode = simplifiedError?.statusCode
    message= simplifiedError?.message
    errorSources = simplifiedError?.errorSources
  }

// ultimate Return
  return res.status(statusCode).json({
    status: false,
    message,
    errorSources,
    stack:config.Node_Env ==='development'?err?.stack:null,
    // err
  });
};
