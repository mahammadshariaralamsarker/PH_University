/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../Errors/AppErrors';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import { StatusCodes } from 'http-status-codes';
import QueryBuilder from '../../Builder/QueryBuilder';
import { StudentSearchAbleFields } from './student.constant';

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObject = {...query} //copy

  // const excludeFields = ['searchTerm','sort','limit','page','fields']
  // excludeFields.forEach((element)=>{
  //   delete queryObject[element]
  // })
  // const StudentSearchAbleFields = ['name.firstName','name.middleName','name.lastName','email','presentAddress',]
  // let searchTerm =''
  // if(query?.searchTerm){
  //   searchTerm = query.searchTerm as string
  // }
  // const searchQuery = Student.find({
  //   $or:StudentSearchAbleFields.map((field)=>({
  //     [field]:{$regex:searchTerm,$options:'i'}
  //   }))
  // })
  // const filterQuery =  searchQuery.find(queryObject)
  //   .populate('admissionDepartment')
  //   .populate('admissionSemester')
  //   .populate({
  //     path: 'admissionDepartment',
  //     populate: {
  //       path: 'academicFaculty',
  //     },
  //   });
  //   let sort = '-createdAt'
  //   if(query.sort){
  //     sort = query.sort as string
  //   }
  //   const sortQuery =  filterQuery.sort(sort)
  //   const page = 1
  //   let limit = 1
  //   let skip =0
  //   if(query.limit){
  //     limit = query.limit as number
  //   }
  //   if(query.page){
  //     limit = query.limit as number
  //     skip = (page-1)*limit
  //   }

  //   const paginateQuery = sortQuery.skip(skip)
  //   const limitQuery = paginateQuery.limit(limit)

  //   // Field Limiting
  //   let fields = ''
  //   if(query.fields){
  //     fields = (query.fields as string).split(',').join(' ')
  //     console.log({fields});
  //   }
  //   const fieldQuery = await limitQuery.select(fields)
  //   console.log(query , queryObject);

  // return fieldQuery;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'admissionDepartment ',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(StudentSearchAbleFields)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery;
  return result;
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
