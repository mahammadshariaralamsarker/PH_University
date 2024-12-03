import { model, Schema } from 'mongoose';
import { TacademicDepartment } from './academicDepartment.interface';

const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: {
      type: String,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      // unique: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
academicDepartmentSchema.pre('save',async function(next){
  const isDepartmentExist = await AcademicDepartment.findOne({name:this.name})
  if(isDepartmentExist){
    throw new Error("already exist")
  }
  next()
})
academicDepartmentSchema.pre('findOneAndUpdate',async function(next){
  const query = this.getQuery()
  const isDepartmentExist = await AcademicDepartment.findOne(query)
  if(!isDepartmentExist){
    throw new Error ('this department not exist')
  };
  next()
})
export const AcademicDepartment = model<TacademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);

