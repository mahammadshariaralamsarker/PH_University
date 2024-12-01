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
    message: 'Academic all data Received  successfully',
    data: result,
  });
})
const getSingleAcademicSemester = catchAsync(async(req,res)=>{
  const {id} = req.params
  const result = await academicServices.getSingleAcademicInformation(id)
  sendResponse(res,{
    success:true,
    statusCode: 200,
    message: 'Academic single data Received  successfully',
    data: result,
  })
})
const updateSingleAcademicInformation = catchAsync(async(req,res)=>{
  const {id} = req.params;
  const data = req.body;
  const result = await academicServices.updateSingleAcademicInformation(id,data)
  sendResponse(res,{
    success:true,
    statusCode: 200,
    message: 'Academic single data Updated successfully',
    data: result,
  })
})
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicInformation
};
