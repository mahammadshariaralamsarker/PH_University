import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import { validateRequest } from '../../middleWare/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';

const router = express.Router();
router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidation.createAcademicSemesterValidationSchema,
  ),
  AcademicSemesterController.createAcademicSemester,
);
router.get('/:id',AcademicSemesterController.getSingleAcademicSemester)
router.get('/',AcademicSemesterController.getAllAcademicSemester)

export const AcademicSemesterRoute = router;
