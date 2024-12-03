import { model, Schema  } from "mongoose";
import { TacademicDepartment } from "./academicDepartment.interface";

const academicDepartmentSchema = new Schema <TacademicDepartment>(
  {
  name:{
    type:String
  },
  academicFaculty:{
    type:Schema.Types.ObjectId,
    unique:true,
    ref:'AcademicFaculty'
    },
  },
    {
      timestamps:true,
      versionKey:false
    }
)
export const AcademicDepartment = model<TacademicDepartment>('AcademicDepartment',academicDepartmentSchema)