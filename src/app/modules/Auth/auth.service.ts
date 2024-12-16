import AppError from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpstatus from 'http-status-codes'; 
const loginUser = async (payload: TLoginUser) => {

const user = await User.isUserExistsByCustomId(payload.id)
  // check if the user is exist
  if (!user) {
    throw new AppError(httpstatus.NOT_FOUND, 'This User is not Found!');
  }







  // // Check the user is deleted ?
  // const isDeleted = isUserExists?.isDeleted;
  // const userStatus = isUserExists?.status;
  // if (isDeleted) {
  //   throw new AppError(httpstatus.FORBIDDEN, 'This User is already deleted!');
  // }
  // if (userStatus ==='blocked') {
  //   throw new AppError(httpstatus.FORBIDDEN, 'This User is already Blocked!');
  // }
  // Checking if the password is corrected  
  if(!await User.isPasswordMatched(payload?.password,user.password)){
    throw new AppError(httpstatus.FORBIDDEN, 'Password donnot matched Blocked!');
  }

  return {};
};
export const AuthService = {
  loginUser,
};
