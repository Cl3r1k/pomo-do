// Constants
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  TOTAL_ANGLE,
  COORDINATE_ROUNDING,
  CANVAS_CLOCK_STROKE_COLOR
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
}): Object => {
  const startAngle = getClockAngle(startHour, startMinute);
  const endAngle = getClockAngle(endHour, endMinute);

  const startAngleRad = getAngleInRad(startAngle);
  const endAngleRad = getAngleInRad(endAngle);

  const sinStartAngleRad =
    Math.floor(Math.sin(startAngleRad) * COORDINATE_ROUNDING) /
    COORDINATE_ROUNDING;
  const cosStartAngleRad =
    Math.floor(Math.cos(startAngleRad) * COORDINATE_ROUNDING) /
    COORDINATE_ROUNDING;
  const sinEndAngleRad =
    Math.floor(Math.sin(endAngleRad) * COORDINATE_ROUNDING) /
    COORDINATE_ROUNDING;
  const cosEndAngleRad =
    Math.floor(Math.cos(endAngleRad) * COORDINATE_ROUNDING) /
    COORDINATE_ROUNDING;

  const xB = xA + length * sinStartAngleRad;
  const yB = yA + length * cosStartAngleRad;
  const xC = xA + length * sinEndAngleRad;
  const yC = yA + length * cosEndAngleRad;

  // Return object
  return { xA, yA, xB, yB, xC, yC };
};

export const drawClockArcedTriangle = (ctx, triangleSettings): void => {
  const arcedTrianglePoints = calculateClockArcedTriangle(triangleSettings);

  console.log('ctx: ', ctx);

  this.drawLine(
    arcedTrianglePoints['xA'],
    arcedTrianglePoints['yA'],
    arcedTrianglePoints['xB'],
    arcedTrianglePoints['yB']
  );
};

export const drawLine = (x1: number, y1: number, x2: number, y2: number, ctx): void => {
  // ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

export const drawCircle = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  ctx,
  anticlockwise: boolean = false,
): void => {
  ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
  const startAngleRad = (Math.PI / 180) * startAngle;
  const endAngleRad = (Math.PI / 180) * endAngle;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngleRad, endAngleRad, anticlockwise);
  ctx.stroke();
};
