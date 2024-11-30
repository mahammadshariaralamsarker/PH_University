export type TUser = {
  id:string,
  password:string,
  needsPasswordChange:boolean,
  role:'admin'|'students'|'faculty', 
  status:'in-progress'|'blocked',
  isDeleted:boolean
}
