/* eslint-disable @typescript-eslint/no-explicit-any */
import { RequestHandler} from 'express';
import { StudentServices } from './student.service';
import { sendResponse } from '../../utils/sendResponse';

const getAllStudents:RequestHandler = async (req , res  ,next ) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    sendResponse(res, {
      success:true,
      statusCode:200,
      message:'All Student Received successfully',
      data:result
    })
  } catch (err: any) {
    next(err)
  }
};

const getSingleStudent :RequestHandler= async (req, res,next) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    sendResponse(res, {
      success:true,
      statusCode:200,
      message:'Single Student get successfully',
      data:result
    })
  } catch (err) {
    next(err)
  }
};

const deleteStudent:RequestHandler = async (req , res ,next ) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      success:true,
      statusCode:200,
      message:'Student deleted successfully',
      data:result
    })
  } catch (err) {
    next(err)
  }
};

export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};