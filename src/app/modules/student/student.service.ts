/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { StatusCodes } from 'http-status-codes';

const getAllStudentsFromDB = async (query:Record<string,unknown>) => { 
  const queryObject = {...query} //copy
  
  const excludeFields = ['searchTerm','sort','limit']
  excludeFields.forEach((element)=>{
    delete queryObject[element]
  }) 
  const StudentSearchAbleFields = ['name.firstName','name.middleName','name.lastName','email','presentAddress']
  let searchTerm =''
  if(query?.searchTerm){
    searchTerm = query.searchTerm as string
  } 
  const searchQuery = Student.find({
    $or:StudentSearchAbleFields.map((field)=>({
      [field]:{$regex:searchTerm,$options:'i'}
    }))
  })
  const filterQuery =  searchQuery.find(queryObject)
    .populate('admissionDepartment')
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
    let sort = '-createdAt'
    if(query.sort){
      sort = query.sort as string
    } 
    const sortQuery =  filterQuery.sort(sort) 
    
    let limit = 1;
    if(query.limit){
      limit = query.limit as number
    } 
    const limitQuery = await sortQuery.limit(limit)

  return limitQuery;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
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
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;
  const modifiedData: Record<string, unknown> = { ...remainingStudentData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findOneAndUpdate({ id }, modifiedData, {
    new: true,
    runValidators: true,
  });
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
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to Delete Student');
    }
    const deleteUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deleteUser) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to Delete User');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Not Successful deleted student',
    );
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
