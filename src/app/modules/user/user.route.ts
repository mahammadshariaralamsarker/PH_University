import express from 'express';
import { UserControllers } from './user.controller';
import { CreateStudentValidationSchema } from '../student/student.validation';
import { validateRequest } from '../../middleWare/validateRequest';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { auth } from '../../middleWare/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',auth(USER_ROLE.admin),
  validateRequest(CreateStudentValidationSchema),
  UserControllers.createStudent,
);
router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
export const UserRoutes = router;
