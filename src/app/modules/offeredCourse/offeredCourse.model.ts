import mongoose, { Schema } from "mongoose";
import { TOfferedCourse } from "./offeredCourse.interface";

const offeredCourseSchema = new mongoose.Schema<TOfferedCourse>(
  {
    semesterRegistration:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'SemesterRegistration'
    },
    academicSemester:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'AcademicSemester'
    },
    academicFaculty:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'AcademicFaculty'
    },
    course:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'Course'
    },
    faculty:{
      type:Schema.Types.ObjectId,
      required:true,
      ref:'Faculty'
    },
    maxCapacity:{
      type:Number,
      required:true
    },
    section:{
      type:Number,
      required:true
    },
    days:{
      type:String,
      enum:Days
    }

  }
)