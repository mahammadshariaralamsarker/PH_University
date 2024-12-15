import AppError from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpstatus from 'http-status-codes';
import bcrypt from 'bcrypt'
const loginUser = async (payload: TLoginUser) => {
  // check if the user is exist
  const isUserExists = await User.findOne({ id: payload?.id });
  if (!isUserExists) {
    throw new AppError(httpstatus.NOT_FOUND, 'This User is not Found!');
  }
  // Check the user is deleted ?
  const isDeleted = isUserExists?.isDeleted;
  const userStatus = isUserExists?.status;
  if (isDeleted) {
    throw new AppError(httpstatus.FORBIDDEN, 'This User is already deleted!');
  }
  if (userStatus ==='blocked') {
    throw new AppError(httpstatus.FORBIDDEN, 'This User is already Blocked!');
  }
  // Checking if the password is corrected 
  const isPassword = await bcrypt.compare(payload?.password,isUserExists?.password)
  console.log(isPassword);
  return {};
};
export const AuthService = {
  loginUser,
};
