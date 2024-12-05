import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/CatchAsync';
import { academicServices } from './academicSemester.service';
import { StatusCodes } from 'http-status-codes';

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicData = req.body;
  const result =
    await academicServices.createAcademicSemesterIntoDB(academicData);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic Data is created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await academicServices.getAllAcademicSemestersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic all data Received  successfully',
    data: result,
  });
});
const getSingleAcademicSemesterFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await academicServices.getSingleAcademicInformation(id);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic single data Received  successfully',
    data: result,
  });
});
const updateSingleAcademicInformation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const result = await academicServices.updateAcademicSemesterIntoDB(id, data);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'Academic single data Updated successfully',
    data: result,
  });
});
export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicInformation,
};
