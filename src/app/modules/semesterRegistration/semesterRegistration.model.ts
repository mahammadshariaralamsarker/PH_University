import mongoose from 'mongoose';
import { TsemesterRegistration } from './semesterRegistration.interface';
import { Schema } from 'mongoose';
import { semesterRegistrationStatus } from './semesterRegistration.constant';

const semesterRegistrationSchema = new mongoose.Schema<TsemesterRegistration>({
  academicSemester: {
    type:Schema.Types.ObjectId,
    ref:'AcademicSemester',
    required:true,
    unique:true,
  },
  status:{
    type:String,
    enum:semesterRegistrationStatus,
    default:'UPCOMING'
  },
  startDate:{
    type:Date,
    required:true
  },
  endDate:{
    type:Date,
    required:true
  },
  minCredit:{
    type:Number,
    default:3
  },
  maxCredit:{
    type:Number,
    default:15
  }
},
{
  timestamps:true
}
);

export const SemesterRegistration = mongoose.model<TsemesterRegistration>('SemesterRegistration',semesterRegistrationSchema);
