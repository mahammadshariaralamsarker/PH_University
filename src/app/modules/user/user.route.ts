import express  from 'express';
import { UserControllers } from './user.controller';
import { CreateStudentValidationSchema } from '../student/student.validation';
import { validateRequest } from '../../middleWare/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(CreateStudentValidationSchema),
  UserControllers.createStudent,
);

export const UserRoutes = router;
