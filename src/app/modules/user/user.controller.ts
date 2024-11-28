import { Request, Response } from "express";
import { UserService } from "./user.service";




const createStudent = async (req: Request, res: Response) => {
  try {
    const {password, student: studentData } = req.body;
    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserService.createStudentIntoDB(password,studentData);

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    });
  }
};
export const UserControllers = {
  createStudent
}