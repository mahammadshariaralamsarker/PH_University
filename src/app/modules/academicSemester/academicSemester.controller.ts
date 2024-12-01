import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/CatchAsync';
import { academicServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicData = req.body;
  const result =
    await academicServices.createAcademicSemesterIntoDB(academicData);
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic Data is created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req,res)=>{
  const result = await academicServices.getAllAcademicSemesterInformation()
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Academic data Received created successfully',
    data: result,
  });
})
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester
};
