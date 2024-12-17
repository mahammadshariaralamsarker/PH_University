import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { validateRequest } from '../../middleWare/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { auth } from '../../middleWare/auth';

const router = express.Router();
router.post(
  '/create-academic-faculty',
  validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyController.createAcademicFaculty,
);

router.patch(
  '/:facultyID',
  validateRequest(
    AcademicFacultyValidation.UpdateacademicFacultyValidationSchema,
  ),
  academicFacultyController.getUpdatedAcademicFaculty,
);

router.get('/:facultyID', academicFacultyController.getSingleAcademicFaculty);
router.get('/',auth(), academicFacultyController.getAllAcademicFaculty);
export const AcademicFacultyRoute = router;
