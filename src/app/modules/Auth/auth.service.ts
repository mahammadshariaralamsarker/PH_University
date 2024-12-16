
import config from '../../config';
import AppError from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpstatus from 'http-status-codes';
import  jwt  from 'jsonwebtoken';




const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExistsByCustomId(payload.id);
  // check if the user is exist
  if (!user) {
    throw new AppError(httpstatus.NOT_FOUND, 'This User is not Found!');
  }
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(httpstatus.FORBIDDEN, 'This User is already deleted!');
  }
  const userStatus = user?.status;
  if (userStatus === 'blocked') {
    throw new AppError(httpstatus.FORBIDDEN, 'This User is already Blocked!');
  }

  // Checking if the password is corrected
  if (!(await User.isPasswordMatched(payload?.password, user.password))) 
    throw new AppError( httpstatus.FORBIDDEN, 'Password donnot matched Blocked!', );
  
  const jwtPayload = {
    userId:user ,
    role:user.role
  }
  
  const accessToken = jwt.sign(jwtPayload,config.jwt_access_secret as string,{
    expiresIn:"10d"
  })

  return {
    accessToken,
    needsPasswordChange:user.needsPasswordChange
  };
};
export const AuthService = {
  loginUser,
};
