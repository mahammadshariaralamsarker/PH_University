import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';

const Month: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  startMonth: {
    type: String,
    enum:Month
  },
  endMonth: {
    type: String,
    enum:Month
  },
},
{
  timestamps:true
});
export const AcademicSemester= model<TAcademicSemester>('AcademicSemester',AcademicSemesterSchema)
