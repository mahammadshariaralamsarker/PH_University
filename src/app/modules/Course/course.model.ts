import { model,   Schema,   } from "mongoose";
import { TCourse,  TpreRequisiteCoursesSchema } from "./course.interface"; 

const preRequisiteCoursesSchema = new Schema<TpreRequisiteCoursesSchema>({
  course:{
    type:Schema.Types.ObjectId,
  },
  isDeleted:{
    type:Boolean,
    default:false
  }
})

const courseSchema = new Schema<TCourse>({
  title:{
    type:String,
    unique:true,
    trim:true,
    required:true
  },
  prefix:{
    type:String, 
    trim:true,
    required:true
  },
  code:{
    type:Number,  
    required:true
  },
  credits:{
    type:Number,
    trim:true,
    required:true
  },
  preRequisiteCourses:[preRequisiteCoursesSchema]
})


export const Course =  model<TCourse>('Course',courseSchema)