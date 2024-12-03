import express from 'express';
import { validateRequest } from '../../middleWare/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { academicFacultyController } from '../academicFaculty/academicFaculty.controller';
import { AcademicDepartmentController } from './academicDepartment.controller';
const router = express.Router();
router.post(
  '/create-academic-department',
  validateRequest(
    AcademicDepartmentValidation.academicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartmentIntoDB
);

router.patch(
  '/:departmentID',
  validateRequest(
    AcademicDepartmentValidation.UpdateacademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartmentIntoDB,
);

router.get(
  '/:departmentID',
  AcademicDepartmentController.getSingleAcademicDepartmentIntoDB,
);
router.get('/',AcademicDepartmentController.getAllAcademicDepartmentIntoDB);

export const AcademicDepartmentRoute = router;
