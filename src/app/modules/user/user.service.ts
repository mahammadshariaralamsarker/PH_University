import config from "../../config";
import { TStudent } from "../student/student.interface";
import { NewUser } from "./user.interface";
import { User } from "./user.model";



const createStudentIntoDB = async (password:string,studentData: TStudent) => {
    // create a user object  
    const user:NewUser = {}
    user.role= 'student'
    // if password is not given then use default password from my .env
    user.password=password||(config.default_Password as string)
    // Set manually generally id 
    user.id= '20301000'
    // create a user 
    const result = await User.create(user);
    // create a student 
    if(Object.keys(result).length){
      // set id, _id as user 
      studentData.id = result.id
      studentData.user = result._id
    }
  
  return result;
};
export const UserService={
  createStudentIntoDB,

}