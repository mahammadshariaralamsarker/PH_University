import { catchAsync } from "../../utils/CatchAsync";
import { sendResponse } from "../../utils/sendResponse";
import httpstatus from 'http-status-codes'
import { AuthService } from "./auth.service";


const loginUser = catchAsync(async(req,res) =>{
  const result = await AuthService.loginUser(req.body)
  sendResponse(res, {
    statusCode: httpstatus.OK,
    success: true,
    message: 'Login  successfully',
    data: result,
  });
})

export const AuthController = {
  loginUser
}