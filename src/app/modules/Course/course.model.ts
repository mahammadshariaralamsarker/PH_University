import { model, Schema } from 'mongoose';
import {   TCourse, TCourseFaculty, TpreRequisiteCoursesSchema } from './course.interface';
 

const preRequisiteCoursesSchema = new Schema<TpreRequisiteCoursesSchema>({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const courseSchema = new Schema<TCourse>({
  title: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  prefix: {
    type: String,
    trim: true,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  credits: {
    type: Number,
    trim: true,
    required: true,
  },
  preRequisiteCourses: [preRequisiteCoursesSchema],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const Course = model<TCourse>('Course', courseSchema);

const courseFacultiesSchema = new Schema <TCourseFaculty> ({
  course:{
    type:Schema.Types.ObjectId,
    ref:"Course",
    unique:true
  },
  faculties:[{
    type:Schema.Types.ObjectId,
    ref:"Faculty"
  }]
})

export const CourseFaculty = model<TCourse>('CourseFaculty',courseFacultiesSchema)