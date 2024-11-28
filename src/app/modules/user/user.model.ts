import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>({
  id:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  needsPasswordChange:{
    type:Boolean,
    default:true
  },
  role:{
    type:String,
    enum:['admin','students','faculty',]
  },
  status:{
    type:String,
    enum:['in-progress','blocked',],
    default:'in-progress'
  },
  isDeleted:{
    type:Boolean,
    default:false
  },
},
{
  timestamps:true,
  versionKey:false
})


export const User = model<TUser>('user',userSchema)