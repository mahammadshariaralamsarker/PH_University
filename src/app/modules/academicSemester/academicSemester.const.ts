import {
  TAcademicSemesterCode,
  TAcademicSemesterName,
  TAcademicSemesterNameCodeMapper,
} from './academicSemester.interface';

export const Month: string[] = [
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
export const AcademicSemesterName: TAcademicSemesterName[] = [
  'Autum',
  'Summer',
  'Fall',
];
export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];
export const academicSemesterCodeNameCodeMapper: TAcademicSemesterNameCodeMapper =
  {
    Autum: '01',
    Summer: '02',
    Fall: '03',
  };
