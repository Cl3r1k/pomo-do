// Constants
import { HOURS_IN_DAY } from '@app/_constants/constants';

export const getDayTimeLabel = (startTime: number, endTime: number) => {
  const averageTime = endTime > startTime ? (endTime - startTime) / 2 : (HOURS_IN_DAY - (endTime - startTime)) / 2;
  return averageTime;
};
