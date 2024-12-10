import   express  from "express"
import { validateRequest } from "../../middleWare/validateRequest" 
import { SemesterRegistrationValidations } from "./semesterRegistration.validation"
import { SemesterRegistrationController } from "./semesterRegistration.controller"
const router = express.Router()



router.post('/create-semester-registration',validateRequest(SemesterRegistrationValidations.createsemesterRegistrationValidationSchema),SemesterRegistrationController.createsemesterRegistration)


export const SemesterRegistrationRoute = router;