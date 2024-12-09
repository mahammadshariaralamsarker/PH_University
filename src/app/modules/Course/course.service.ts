import QueryBuilder from '../../Builder/QueryBuilder';
import { CourseSearchableFields } from './course.constant';
import { TCourse } from './course.interface';
import { Course } from './course.model';

const createCourseIntoDB = async (payload: TCourse) => {
  const result = await Course.create(payload);
  return result;
};
const getAllCoursesFromDB = async (payload: Record<string, unknown>) => {
  const courseQuery = new QueryBuilder(
    Course.find().populate('preRequisiteCourses.course'),
    payload,
  )
    .search(CourseSearchableFields)
    .filter()
    .sort()
    .fields();
  const result = await courseQuery.modelQuery;
  return result;
};
const getSingleCoursesFromDB = async (id: string) => {
  const result = await Course.findById(id).populate(
    'preRequisiteCourses.course',
  );
  return result;
};
const deleteCourseFromDB = async (id: string) => {
  const result = await Course.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
  const { preRequisiteCourses, ...courseRemaingData } = payload;
  const updateBasicCourseInfo = await Course.findByIdAndUpdate(
    id,
    courseRemaingData,
    {
      new: true,
      runValidators: true,
    },
  );

  //check if there any preRequisite Course is updated information is here
  if (preRequisiteCourses && preRequisiteCourses.length > 0) {
    // filter out the deleted field
    const deletedPreRequisite = preRequisiteCourses
      .filter((element) => element.course && element.isDeleted)
      .map((element) => element.course);
    const newPreRequisites = preRequisiteCourses?.filter(
      (ele) => ele.course && !ele.isDeleted,
    );
    // filter out the ADDed field
    const newPreRequisitesCourses = await Course.findByIdAndUpdate(id, {
      $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
    });
    const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(id, {
      $pull: { preRequisiteCourses: { course: { $in: deletedPreRequisite } } },
    });
  }

  const result = await Course.findById(id).populate('preRequisiteCourses.course')
  return result;
};

export const CourseServices = {
  createCourseIntoDB,
  getAllCoursesFromDB,
  getSingleCoursesFromDB,
  deleteCourseFromDB,
  updateCourseIntoDB,
};
