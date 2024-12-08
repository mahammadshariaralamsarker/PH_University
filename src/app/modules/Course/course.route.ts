import express from 'express'; 
import { CourseValidation } from './course.validation';
import { validateRequest } from '../../middleWare/validateRequest';
import { CourseControllers } from './course.controller';

const router = express.Router();
router.post('/create-course',
  validateRequest(CourseValidation.createCourseValidationSchema),
  CourseControllers.createCourse 
);

// router.patch('/:id',
//   validateRequest(
//     AcademicFacultyValidation.UpdateacademicFacultyValidationSchema,
//   ),
//   academicFacultyController.getUpdatedAcademicFaculty,
// );

router.get('/:id',CourseControllers.getSingleCourse);
router.delete('/:id',CourseControllers.deleteCourse);
router.get('/', CourseControllers.getAllCourses);
export const CourseRoute = router;
