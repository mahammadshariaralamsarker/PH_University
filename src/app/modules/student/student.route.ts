import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middleWare/validateRequest';
import { studentValidations } from './student.validation';

const router = express.Router();

// router.post('/create-student', StudentControllers.createStudent);
router.get('/:Id', StudentControllers.getSingleStudent);

router.delete('/:Id', StudentControllers.deleteStudent);
router.patch(
  '/:Id',
  validateRequest(studentValidations.UpdateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
