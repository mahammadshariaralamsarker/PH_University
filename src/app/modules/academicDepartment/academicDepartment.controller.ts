import { StatusCodes } from 'http-status-codes';
import { catchAsync } from '../../utils/CatchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { AcademicDepartmentServices } from './academicDepartment.service';

const createAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.createAcademicDepartment(
    req.body
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Academic Department is Created Successfully',
    data: result,
  });
});
const getSingleAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const {  departmentID } = req.params;
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartment(departmentID);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Single Academic Department is Here Successfully',
    data: result,
  });
});
const getAllAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const result = await AcademicDepartmentServices.getAllAcademicDepartment();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'All Academic Department is Here Successfully',
    data: result,
  });
});
const updateAcademicDepartmentIntoDB = catchAsync(async (req, res) => {
  const { departmentID } = req.params; 
  const updatedData = req.body; 
  const result =await AcademicDepartmentServices.updateAcademicDepartment(
    departmentID,
    updatedData,
  );
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: ' Academic Department Updated is Here Successfully',
    data:result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartmentIntoDB,
  getSingleAcademicDepartmentIntoDB,
  getAllAcademicDepartmentIntoDB,
  updateAcademicDepartmentIntoDB,
};
