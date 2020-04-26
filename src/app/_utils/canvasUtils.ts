// Constants
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  TOTAL_ANGLE,
  COORDINATE_ROUNDING,
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
  xA,
  yA,
  length,
  startHour,
  startMinute,
  endHour,
  endMinute,
}): number => {
  const startAngle = getClockAngle(startHour, startMinute);
  const endAngle = getClockAngle(endHour.entHours, endMinute);

  const startAngleRad = getAngleInRad(startAngle);
  const endAngleRad = getAngleInRad(endAngle);

  const sinStartAngleRad = Math.floor(Math.sin(startAngleRad) * COORDINATE_ROUNDING) / COORDINATE_ROUNDING;
  const cosStartAngleRad = Math.floor(Math.cos(startAngleRad) * COORDINATE_ROUNDING) / COORDINATE_ROUNDING;
  const sinEndAngleRad = Math.floor(Math.sin(endAngleRad) * COORDINATE_ROUNDING) / COORDINATE_ROUNDING;
  const cosEndAngleRad = Math.floor(Math.cos(endAngleRad) * COORDINATE_ROUNDING) / COORDINATE_ROUNDING;

  const xB = xA + length * sinStartAngleRad;
  const yB = yA + length * cosStartAngleRad;
  const xC = xA + length * sinEndAngleRad;
  const yC = yA + length * cosEndAngleRad;

  // Return object
  return 1;
};
