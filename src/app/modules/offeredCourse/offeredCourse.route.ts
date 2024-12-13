import express from 'express'; 
import { validateRequest } from '../../middleWare/validateRequest';
import { offeredCourseValidation } from './offeredCourse.validation';
import { OfferedCourseController } from './offeredCourse.controller';

const router = express.Router();

router.post('/create-offered-course',validateRequest(offeredCourseValidation.createOfferedCourseValidation),OfferedCourseController.createOfferedCourse)

export const OfferedCourseRoute = router;