import { z } from "zod";

const userValidationSchema =z.object({
  // id:z.string(),
  password:z.string({invalid_type_error:'Password Must be Required'}).max(20,{message:"password cannot be more than 20"}),
  // needSpasswordChange:z.boolean().optional().default(true),
  // role:z.enum(['admin','students','faculty',]),
  // status:z.enum(['in-progress','blocked',]).default('in-progress'),
  // isDeleted:z.boolean().optional().default(false),
})
 

export const UserValidation = {
  userValidationSchema
}