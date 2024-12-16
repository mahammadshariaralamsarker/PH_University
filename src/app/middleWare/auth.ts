import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/CatchAsync';
import AppError from '../Errors/AppErrors';
import httpstatus from "http-status-codes"

export const auth = () => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token  =req.headers.authorization
      if(!token){
        throw new AppError(httpstatus.UNAUTHORIZED, "You are not authorized!")
      }
      next();
    },
  );
};
