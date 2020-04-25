// Constants
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  TOTAL_ANGLE,
} from '@app/_constants/constants';

/**
 * name
 */
export const getAngleInRad = (angle): number => {
  return (Math.PI / 180) * angle;
};

/**
 * name
 */
export const getClockAngle = (hour: number, minute: number): number => {
  return (TOTAL_ANGLE / HOURS_IN_DAY) * (hour + minute / MINUTES_IN_HOUR);
};

/**
 * name
 */
export const calculateClockArcedTriangle = ({
  x,
  y,
  length,
  startHour,
  startMinute,
  endHour,
  endMinute,
}): number => {
  return 1;
};
