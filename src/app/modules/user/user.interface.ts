/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'students' | 'faculty';
  status: 'in-progress' | 'blocked';
  isDeleted: boolean;
};
export interface UserModel extends Model<TUser>{
  isUserExistsByCustomId(id:string):Promise<TUser>
  isPasswordMatched(plaintextPassword:string, hashedPassword:string):Promise<boolean>
}
export type TUserRole = keyof typeof USER_ROLE