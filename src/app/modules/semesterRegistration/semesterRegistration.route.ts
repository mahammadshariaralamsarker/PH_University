import express from 'express';
import { validateRequest } from '../../middleWare/validateRequest';
import { SemesterRegistrationValidations } from './semesterRegistration.validation';
import { SemesterRegistrationController } from './semesterRegistration.controller';
const router = express.Router();

router.patch(
  '/:id',
  validateRequest(
    SemesterRegistrationValidations.updatesemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

router.post(
  '/create-semester-registration',
  validateRequest(
    SemesterRegistrationValidations.createsemesterRegistrationValidationSchema,
  ),
  SemesterRegistrationController.createsemesterRegistration,
);

router.get(
  '/:id',
  SemesterRegistrationController.getSinglesemesterRegistration,
);
router.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

router.get('/', SemesterRegistrationController.getAllsemesterRegistration);

export const SemesterRegistrationRoute = router;
