import { ZodError } from "zod"
import { TErrorSource } from "../interface/error"
// import { StatusCodes } from "http-status-codes"

export const handleZodError =(err:ZodError)=>{
  const errorSources:TErrorSource= err.issues.map((issue:ZodError)=>{
    return{
      path:issue?.path[issue.path.length-1],
      message:issue.message
    }
  })
  const StatusCodes = 400
  return {
    StatusCodes,
    message:'Validation Error',
    errorSources
  }
}