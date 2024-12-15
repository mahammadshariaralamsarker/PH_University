import { TSchedule } from './offeredCourse.interface';

export const hasTimeConflict = (
  assingSchedules: TSchedule[],
  newSchedule: TSchedule,
) => {
  for(const schedule of assingSchedules){
    const existingStartTime = new Date(`1979-01-02T${schedule.startTime}`);
    const existingEndTime = new Date(`1979-01-02T${schedule.endTime}`);
    const newStartTime = new Date(`1979-01-02T${schedule.startTime}`);
    const newEndTime = new Date(`1979-01-02T${schedule.endTime}`);

    if (newStartTime < existingEndTime && newEndTime >existingStartTime ) { 
      return true;
    }
  } 
  return false
};
