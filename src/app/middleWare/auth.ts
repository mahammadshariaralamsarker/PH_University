import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/CatchAsync';

export const auth = () => {
  return catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      console.log(req.headers.authorization);
      next();
    },
  );
};
