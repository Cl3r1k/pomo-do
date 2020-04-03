// Constants
import { HOURS_IN_DAY } from '@app/_constants/constants';

export const getDayTimeLabel = (startTime: number, endTime: number) => {
  const averageTime = endTime > startTime ? (startTime + endTime) / 2 : ((startTime + endTime + HOURS_IN_DAY) / 2) % HOURS_IN_DAY;

  if (averageTime < 5) {
    return 'Night';
  }
  if (averageTime < 12) {
    return 'Morning';
  }
  if (averageTime < 17) {
    return 'Afternoon';
  }
  if (averageTime < 21) {
    return 'Evening';
  }

  return 'Night';
};
