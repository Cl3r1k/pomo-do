// Constants
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  TOTAL_ANGLE,
  COORDINATE_ROUNDING,
  CANVAS_CLOCK_STROKE_COLOR,
} from '@app/_constants/constants';

/**
 * name
 */
export const floorBy = (num: number, coefficient: number) =>
  Math.floor(num * coefficient) / coefficient;

export const floorByCoordinateRounding = (num) =>
  floorBy(num, COORDINATE_ROUNDING);

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
export const drawLine = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  ctx
): void => {
  // ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
};

/**
 * name
 */
export const drawCircle = (
  x: number,
  y: number,
  radius: number,
  startAngle: number,
  endAngle: number,
  ctx,
  anticlockwise: boolean = false
): void => {
  ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
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
  for (let i = 0; i <= 360; i += angle) {
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

    if (i !== 90 && i !== 270) {
      if (i === 0) {
        ctx.strokeStyle = 'red';
      } else {
        ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
      }
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
  drawCircle(centerPoint, centerPoint, circleRadius, 0, 360, ctx);
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

  const startAngleRad = getAngleInRad(startAngle);
  const endAngleRad = getAngleInRad(endAngle);

  const sinStartAngleRad = floorByCoordinateRounding(Math.sin(startAngleRad));
  const cosStartAngleRad = floorByCoordinateRounding(Math.cos(startAngleRad));
  const sinEndAngleRad = floorByCoordinateRounding(Math.sin(endAngleRad));
  const cosEndAngleRad = floorByCoordinateRounding(Math.cos(endAngleRad));

  const xB = floorByCoordinateRounding(xA + length * sinStartAngleRad);
  const yB = floorByCoordinateRounding(yA + length * cosStartAngleRad);
  const xC = floorByCoordinateRounding(xA + length * sinEndAngleRad);
  const yC = floorByCoordinateRounding(yA + length * cosEndAngleRad);

  // Return object
  return { xA, yA, xB, yB, xC, yC };
};

/**
 * name
 */
export const drawClockArcedTriangle = (ctx, triangleSettings): void => {
  const arcedTrianglePoints = calculateClockArcedTriangle(triangleSettings);

  console.log('drawClockArcedTriangle() ctx: ', ctx);
  console.log('drawClockArcedTriangle() triangleSettings: ', triangleSettings);
  console.log(
    'drawClockArcedTriangle() arcedTrianglePoints: ',
    arcedTrianglePoints
  );

  // drawLine(
  //   arcedTrianglePoints['xA'],
  //   arcedTrianglePoints['yA'],
  //   arcedTrianglePoints['xB'],
  //   arcedTrianglePoints['yB'],
  //   ctx
  // );
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
  const singleTriangle = hoursData[0];

  const triangleSettings = {
    xA: triangleRadius,
    yA: triangleRadius,
    length: triangleRadius,
    ...singleTriangle,
  };
  drawClockArcedTriangle(ctx, triangleSettings); // <--- stopped here

  // calculateClockArcedTriangle();

  // const startAngle = getClockAngle(singleTriangle.startHour, singleTriangle.startMinute);
  // const endAngle = getClockAngle(singleTriangle.endHour, singleTriangle.endMinute);

  // const startAngleRad = getAngleInRad(startAngle);
  // const endAngleRad = getAngleInRad(endAngle);
  // const sinStartRad = Math.floor(Math.sin(startAngleRad) * 10000) / 10000;
  // const cosStartRad = Math.floor(Math.cos(endAngleRad) * 10000) / 10000;

  // const verticalCorrection = x1 + length * sinRad === x1 ? lineLength : 0;

  // const xCStart = x1 + length * sinRad;
  // const yCStart = y1 + length * cosRad;

  // this.drawMark(canvasCenter, canvasCenter, 0, triangleRadius, startAngle);
  // canvasUtils.drawCircle();
  // this.drawLine();
};
