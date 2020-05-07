// Constants
import {
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
  TOTAL_ANGLE,
  ANGLE_CORRECTION,
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
  return (
    (TOTAL_ANGLE / HOURS_IN_DAY) * (hour + minute / MINUTES_IN_HOUR) -
    ANGLE_CORRECTION
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
  for (let i = 0; i <= TOTAL_ANGLE; i += angle) {
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
  drawArc(ctx, centerPoint, centerPoint, circleRadius, 0, TOTAL_ANGLE);
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
  const TRIANGLE_COLOR = 'rgba(236, 57, 66, 0.1)';
  ctx.fillStyle = 'red';
  // ctx.strokeStyle = TRIANGLE_COLOR;

  const arcedTrianglePoints = calculateClockArcedTriangle(triangleSettings);

  // console.log('drawClockArcedTriangle() ctx: ', ctx);
  console.log('drawClockArcedTriangle() triangleSettings: ', triangleSettings);
  console.log(
    'drawClockArcedTriangle() arcedTrianglePoints: ',
    arcedTrianglePoints
  );

  ctx.beginPath();
  // ctx.moveTo(arcedTrianglePoints['xA'], arcedTrianglePoints['yA']);  // Move to clock center
  ctx.moveTo(90, 90);  // Move to clock center
  // ctx.lineTo(arcedTrianglePoints['xB'], arcedTrianglePoints['yB']);  // Line to Start_time
  ctx.lineTo(140, 60);  // Line to Start_time
  // ctx.arc(
  //   arcedTrianglePoints['xA'],
  //   arcedTrianglePoints['yA'],
  //   arcedTrianglePoints['length'],
  //   arcedTrianglePoints['startAngle'],
  //   arcedTrianglePoints['endAngle'],
  //   false
  // );  // Arc from Start_time to End_time
  // ctx.arc(
  //   arcedTrianglePoints['xA'],
  //   arcedTrianglePoints['yA'],
  //   arcedTrianglePoints['length'],
  //   arcedTrianglePoints['startAngle'],
  //   arcedTrianglePoints['endAngle'],
  //   false
  // );  // Arc from Start_time to End_time
  // ctx.moveTo(arcedTrianglePoints['xA'], arcedTrianglePoints['yA']);  // Move back to clock center
  ctx.arcTo(140, 60, 140, 120, 90);
  ctx.lineTo(120, 90);  // Move back to clock center
  // ctx.lineTo(140, 120);  // Move back to clock center
  // ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;
  ctx.moveTo(100, 70);
  ctx.arcTo(100, 130, 50, 70, 40);
  ctx.stroke();

  // drawLine(
  //   arcedTrianglePoints['xA'],
  //   arcedTrianglePoints['yA'],
  //   arcedTrianglePoints['xB'],
  //   arcedTrianglePoints['yB'],
  //   ctx
  // );
  // drawArc(
  //   ctx,
  //   arcedTrianglePoints['xA'],
  //   arcedTrianglePoints['yA'],
  //   arcedTrianglePoints['length'],
  //   arcedTrianglePoints['startAngle'],
  //   arcedTrianglePoints['endAngle']
  // );
  // drawLine(
  //   arcedTrianglePoints['xA'],
  //   arcedTrianglePoints['yA'],
  //   arcedTrianglePoints['xC'],
  //   arcedTrianglePoints['yC'],
  //   ctx
  // );

  // ctx.beginPath();
  // ctx.moveTo(90, 90);
  // ctx.lineTo(120, 80);
  // ctx.lineTo(150, 100);
  // ctx.fill();
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
    xA: centerPoint,
    yA: centerPoint,
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
  // canvasUtils.drawArc();
  // this.drawLine();
};
