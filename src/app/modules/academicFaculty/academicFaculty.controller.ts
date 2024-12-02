import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/CatchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { academicFacultyServices } from './academicFaculty.service';

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty is Created Successfully',
    data: result,
  });
});
const getAllAcademicFaculty = catchAsync(async (req, res) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Faculty is Here Successfully',
    data: result,
  });
});

const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params; 
  const result =
    await academicFacultyServices.getSingleAcademicFacultyFromDB(facultyID);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Faculty is Here Successfully',
    data: result,
  });
});
const getUpdatedAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyID } = req.params;
  const  payload  = req.body;
  const result = await academicFacultyServices.UpdateAcademicFacultyIntoDB(
    facultyID,
    payload,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Academic Faculty Updated Successfully',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculty,
  getUpdatedAcademicFaculty,
};
