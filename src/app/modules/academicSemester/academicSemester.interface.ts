export type Month=
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";


export type AcademicSemester = {
  name:'Autum'|'Summer'|'Fall',
  code:'o1'|'02'|'03'
  year:Date
  startMonth:Month
  endMonth:Month
}