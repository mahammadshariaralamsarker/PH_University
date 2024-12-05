import { model, Schema } from 'mongoose';
import { TacademicDepartment } from './academicDepartment.interface';
import AppError from '../../Errors/AppErrors';
import { StatusCodes } from 'http-status-codes';
const academicDepartmentSchema = new Schema<TacademicDepartment>(
  {
    name: {
      type: String,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicDepartment.findOne({ _id: query });

  if (!isDepartmentExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'this department not exist');
  }
  next();
});
academicDepartmentSchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicDepartment.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'The Department Already Exist');
  }
  next();
});

export const AcademicDepartment = model<TacademicDepartment>(
  'academicDepartment',
  academicDepartmentSchema,
);
