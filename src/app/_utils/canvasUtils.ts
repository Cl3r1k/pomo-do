// Constants
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  CANVAS_SETTINGS,
} from '@app/_constants/constants';

/**
 * name
 */
export const floorBy = (num: number, coefficient: number) =>
  Math.floor(num * coefficient) / coefficient;

export const floorByCoordinateRounding = (num) =>
  floorBy(num, CANVAS_SETTINGS.COORDINATE_ROUNDING);

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
  return (
    (CANVAS_SETTINGS.TOTAL_ANGLE / HOURS_IN_DAY) * (hour + minute / MINUTES_IN_HOUR) -
    CANVAS_SETTINGS.ANGLE_CORRECTION
  );
};

/**
 * name
 */
export const drawLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx
): void => {
  if (!ctx) {
    return;
  }
  // ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

/**
 * name
 */
export const drawArc = (
  ctx,
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  anticlockwise: boolean = false
): void => {
  if (!ctx) {
    return;
  }

  ctx.strokeStyle = CANVAS_SETTINGS.CANVAS_CLOCK_STROKE_COLOR;
  const startAngleRad = (Math.PI / 180) * startAngle;
  const endAngleRad = (Math.PI / 180) * endAngle;
  ctx.beginPath();
  ctx.arc(x, y, radius, startAngleRad, endAngleRad, anticlockwise);
  ctx.stroke();
};

/**
 * name
 */
export const drawRect = (x: number, y: number, z: number, ctx): void => {
  if (!ctx) {
    return;
  }

  ctx.fillStyle = 'blue';
  ctx.fillRect(z * x, z * y, z, z);
};

/**
 * name
 */
export const drawTriangle = (
  x1: number,
  y1: number,
  x2: number,
  y2: number
): void => {
  /*
   * For example we have Triangle ◺ABC
   * where AB = AC = 90
   * angle for height A = 30°
   * angle for B and C = (180 - A) / 2 = (180 - 30) / 2 = 75°
   * BC = 2 * AB * Cos(B) = 2 * 90 * 0.258819 = 46.587
   * h = AB * sin (angle B) = 90 * sin(75°) = 86.933
   */
};

/**
 * name
 * @example
 * * Coordinates: A = (0, 0), B = (90, 0), C = (???)
 * * Common formula:
 * * xC=x(A)+b*sin(alfa)
 * * yC=y(A)+b*cos(alfa)
 * * xC = 0 + 90 * sin(30°) = 0 + 90 * 0.5 = 45
 * * yC = 0 + 90 * cos(30°) = 0 + 90 * 0.866 = 77.94
 */
export const drawMark = (
  x1: number,
  y1: number,
  length: number,
  lineLength: number,
  angle: number,
  ctx
): void => {
  if (!ctx) {
    return;
  }

  for (let i = 0; i <= CANVAS_SETTINGS.TOTAL_ANGLE; i += angle) {
    const angleRad = getAngleInRad(i);
    const sinRad = floorByCoordinateRounding(Math.sin(angleRad));
    const cosRad = floorByCoordinateRounding(Math.cos(angleRad));

    const verticalCorrection = x1 + length * sinRad === x1 ? lineLength : 0;

    const xCStart = x1 + length * sinRad;
    const yCStart = y1 + length * cosRad;
    const xCEnd = x1 + (length + lineLength) * sinRad;
    const yCEnd = y1 + (length + lineLength + verticalCorrection) * cosRad;
    console.log(`with angle ${i} CStart(${xCStart}, ${yCStart})`);
    console.log(`with angle ${i} CEnd(${xCEnd}, ${yCEnd})`);
    console.log(`with angle ${i} verticalCorrection(${verticalCorrection})`);

    if (i !== 90 && i !== 270 && i !== 360) {
      drawLine(xCStart, yCStart, xCEnd, yCEnd, ctx);
    }
  }
};

/**
 * name
 */
export const drawClocks = (
  centerPoint: number,
  circleRadius: number,
  markStart: number,
  markLength: number,
  markAngle: number,
  ctx
): void => {
  if (!ctx) {
    return;
  }

  drawArc(ctx, centerPoint, centerPoint, circleRadius, 0, CANVAS_SETTINGS.TOTAL_ANGLE);
  // drawLine(centerPoint, centerPoint, CANVAS_SIZE, CANVAS_SIZE);
  drawMark(centerPoint, centerPoint, markStart, markLength, markAngle, ctx);

  const startX = centerPoint - (markStart + markLength * 2);
  const endX = centerPoint + markStart + markLength * 2;
  drawLine(startX, centerPoint, endX, centerPoint, ctx);
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
  console.log(
    `calculateClockArcedTriangle() startHour(${startHour}), startMinute(${startMinute}), startAngle(${startAngle})`
  );
  console.log(
    `calculateClockArcedTriangle() endHour(${endHour}), endMinute(${endMinute}), endAngle(${endAngle})`
  );

  const startAngleRad = getAngleInRad(startAngle);
  const endAngleRad = getAngleInRad(endAngle);

  const sinStartAngleRad = floorByCoordinateRounding(Math.sin(startAngleRad));
  const cosStartAngleRad = floorByCoordinateRounding(Math.cos(startAngleRad));
  const sinEndAngleRad = floorByCoordinateRounding(Math.sin(endAngleRad));
  const cosEndAngleRad = floorByCoordinateRounding(Math.cos(endAngleRad));

  // Rearranges x <-> y coordinates, because we need to move in clockwise
  const xB = floorByCoordinateRounding(yA + length * cosStartAngleRad);
  const yB = floorByCoordinateRounding(xA + length * sinStartAngleRad);
  const xC = floorByCoordinateRounding(yA + length * cosEndAngleRad);
  const yC = floorByCoordinateRounding(xA + length * sinEndAngleRad);

  // Return object
  return { xA, yA, xB, yB, xC, yC, length, startAngle, endAngle };
};

/**
 * name
 */
export const drawClockArcedTriangle = (ctx, triangleSettings): void => {
  if (!ctx) {
    return;
  }

  ctx.fillStyle = CANVAS_SETTINGS.TRIANGLE_COLOR;

  const { xA, yA, startHour, startMinute, endHour, endMinute, length } = triangleSettings;

  const startAngle = getClockAngle(startHour, startMinute);
  const endAngle = getClockAngle(endHour, endMinute);

  const startAngleRad = getAngleInRad(startAngle);
  const endAngleRad = getAngleInRad(endAngle);

  ctx.beginPath();
  ctx.moveTo(xA, yA);  // Move to clock center
  ctx.arc(xA, yA, length, startAngleRad, endAngleRad, false); // Arc from Start_time to End_time
  ctx.lineTo(xA, yA);  // Move back to clock center
  ctx.fill();
};

/**
 * name
 */
export const drawArcedTriangles = (
  ctx,
  centerPoint: number,
  triangleRadius: number,
  hoursData: Object[]
): void => {
  // console.log('!canvasUtils.ts! drawArcedTriangles() ctx:', ctx);
  // console.log('!canvasUtils.ts! drawArcedTriangles() hoursData:', hoursData);
  if (!ctx) {
    return;
  }

  hoursData.forEach((hour) => {
    const triangleSettings = {
      xA: centerPoint,
      yA: centerPoint,
      length: triangleRadius,
      ...hour,
    };
    drawClockArcedTriangle(ctx, triangleSettings);
  });
};

/**
 * name
 */
export const clearCanvas = (ctx, x, y, width, height): void => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(x, y, width, height);
};
