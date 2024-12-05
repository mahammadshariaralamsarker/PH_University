/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionDepartment')
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => { 
  const result = await Student.findOne({id})
    .populate('admissionDepartment')
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDB = async (id: string,payload:Partial<TStudent>) => {  
  const result = await Student.findOneAndUpdate({id},payload ,{new:true})
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(404, 'Failed to Delete Student');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(404, 'Failed to Delete User');
    }
    await session.commitTransaction()
    await session.endSession()

    return deletedStudent;
    
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB
};
