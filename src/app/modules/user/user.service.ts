import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";



const createStudentIntoDB = async (password:string,studentData: TStudent) => {
    // create a user object  
    const userData:Partial<TUser> = {}
    userData.role= 'students'
    // if password is not given then use default password from my .env
    userData.password=password||(config.default_Password as string)
    // Set manually generally id 
    userData.id= '20301000'
    // create a user 
    const newUser = await User.create(userData);
    // create a student 
    if(Object.keys(newUser).length){
      // set id, _id as user 
      studentData.id = newUser.id
      studentData.user = newUser._id //Referece id 
      const newStudent = await Student.create(studentData) 
      return newStudent
    }
  
  return newUser;
};
export const UserService={
  createStudentIntoDB,

}