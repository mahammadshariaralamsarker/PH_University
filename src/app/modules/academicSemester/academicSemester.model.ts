import { model, Schema } from 'mongoose';
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName } from './academicSemester.interface';

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
const AcademicSemesterName:TAcademicSemesterName[]=['Autum','Summer','Fall']
const AcademicSemesterCode:TAcademicSemesterCode[]=['01','02','03']

const AcademicSemesterSchema = new Schema<TAcademicSemester>({
  name: {
    type: String,
    required: true,
    enum:AcademicSemesterName
  },
  code: {
    type: String,
    required: true,
    enum:AcademicSemesterCode
  },
  year: {
    type: Date,
    required: true,
  },
  startMonth: {
    type: String,
    required:true,
    enum:Month
  },
  endMonth: {
    type: String,
    required:true,
    enum:Month
  },
},
{
  timestamps:true
});
export const AcademicSemester= model<TAcademicSemester>('AcademicSemester',AcademicSemesterSchema)
