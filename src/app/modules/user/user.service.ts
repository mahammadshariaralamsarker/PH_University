import mongoose from 'mongoose';
import config from '../../config';
import AppError from '../../Errors/AppErrors';
// import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_Password as string);
  userData.role = 'students';
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // session Create
  const session = await mongoose.startSession()
  try {
    // 
    session.startTransaction()
    if(!admissionSemester){
      throw new AppError(404,'Not found')
    }
    userData.id = await generateStudentId(admissionSemester);
    // session  apply-1
    const newUser = await User.create([userData],{session});
    if ( !newUser.length) {
      throw new AppError(404, 'Failed to Create User')
    }
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //Reference id
    
      // session apply-2
      const newStudent = await Student.create([payload],{session});
      if(!newStudent.length){
        throw new AppError(404, 'New Student Create Failed')
      }
      await session.commitTransaction()
      await session.endSession()
      
      return newStudent;
    // return newUser;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
  }
};
export const UserService = {
  createStudentIntoDB,
};
