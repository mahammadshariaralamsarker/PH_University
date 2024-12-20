import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Month,
} from './academicSemester.const';
import AppError from '../../Errors/AppErrors';
import { StatusCodes } from 'http-status-codes';

const AcademicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: {
      type: String,
      required: true,
      enum: AcademicSemesterName,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterCode,
    },
    year: {
      type: String,
      required: true,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Month,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

AcademicSemesterSchema.pre('save', async function name(next) {
  const isSemesterExists = await AcademicSemester.findOne({
    year: this.year,
    name: this.name,
  });
  if (isSemesterExists) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Semester is Already Exists');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'academicSemester',
  AcademicSemesterSchema,
);
