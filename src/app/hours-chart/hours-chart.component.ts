import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Utils
import { getAngleInRad, getClockAngle } from '@app/_utils/canvasUtils';

// Constants
import {
  CANVAS_SIZE,
  CANVAS_CLOCK_STROKE_COLOR,
  HOURS_IN_DAY,
  MINUTES_IN_HOUR,
} from '@app/_constants/constants';

@Component({
  selector: 'app-hours-chart',
  templateUrl: './hours-chart.component.html',
  styleUrls: ['./hours-chart.component.scss'],
})
export class HoursChartComponent implements OnInit {
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    // this.drawRect(0, 0, 20);
    this.drawClocks();
    this.drawArcTriangle();
  }

  drawRect(x: number, y: number, z: number) {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(z * x, z * y, z, z);
  }

  drawClocks() {
    const canvasCenter = CANVAS_SIZE / 2;
    const circleRadius = CANVAS_SIZE * 0.35;
    const markStart = CANVAS_SIZE * 0.37;
    const markLength = 5;
    const markAngle = 360 / HOURS_IN_DAY;

    this.drawCircle(canvasCenter, canvasCenter, circleRadius, 0, 360);
    // this.drawLine(canvasCenter, canvasCenter, CANVAS_SIZE, CANVAS_SIZE);
    this.drawMark(canvasCenter, canvasCenter, markStart, markLength, markAngle);

    const startX = canvasCenter - (markStart + markLength * 2);
    const endX = canvasCenter + markStart + markLength * 2;
    this.drawLine(startX, canvasCenter, endX, canvasCenter);
  }

  drawArcTriangle() {
    const canvasCenter = CANVAS_SIZE / 2;
    const triangleRadius = CANVAS_SIZE * 0.34;

    // * `hoursData` mockup
    const hoursData = [
      { startHour: 8, startMinute: 0, endHour: 8, endMinute: 25 },
      { startHour: 8, startMinute: 10, endHour: 8, endMinute: 35 },
      { startHour: 8, startMinute: 20, endHour: 8, endMinute: 45 },
      { startHour: 8, startMinute: 30, endHour: 8, endMinute: 55 },
      { startHour: 9, startMinute: 0, endHour: 8, endMinute: 25 },
      { startHour: 9, startMinute: 21, endHour: 8, endMinute: 46 },
      { startHour: 9, startMinute: 30, endHour: 8, endMinute: 55 },
    ];

    const singleTriangle = hoursData[0];

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
    // this.drawCircle();
    // this.drawLine();
  }

  drawTriangle(x1: number, y1: number, x2: number, y2: number) {
    /*
     * For example we have Triangle ◺ABC
     * where AB = AC = 90
     * angle for height A = 30°
     * angle for B and C = (180 - A) / 2 = (180 - 30) / 2 = 75°
     * BC = 2 * AB * Cos(B) = 2 * 90 * 0.258819 = 46.587
     * h = AB * sin (angle B) = 90 * sin(75°) = 86.933
     */
  }

  drawMark(
    x1: number,
    y1: number,
    length: number,
    lineLength: number,
    angle: number
  ) {
    // * Coordinates: A = (0, 0), B = (90, 0), C = (???)
    // * Common formula:
    // * xC=x(A)+b*sin(alfa)
    // * yC=y(A)+b*cos(alfa)
    // * xC = 0 + 90 * sin(30°) = 0 + 90 * 0.5 = 45
    // * yC = 0 + 90 * cos(30°) = 0 + 90 * 0.866 = 77.94
    for (let i = 0; i <= 360; i += angle) {
      const angleRad = getAngleInRad(i);
      const sinRad = Math.floor(Math.sin(angleRad) * 10000) / 10000;
      const cosRad = Math.floor(Math.cos(angleRad) * 10000) / 10000;

      const verticalCorrection = x1 + length * sinRad === x1 ? lineLength : 0;

      const xCStart = x1 + length * sinRad;
      const yCStart = y1 + length * cosRad;
      const xCEnd = x1 + (length + lineLength) * sinRad;
      const yCEnd = y1 + (length + lineLength + verticalCorrection) * cosRad;
      console.log(`with angle ${i} CStart(${xCStart}, ${yCStart})`);
      console.log(`with angle ${i} CEnd(${xCEnd}, ${yCEnd})`);
      console.log(`with angle ${i} verticalCorrection(${verticalCorrection})`);

      if (i !== 90 && i !== 270) {
        this.drawLine(xCStart, yCStart, xCEnd, yCEnd);
      }
    }
  }

  drawLine(x1: number, y1: number, x2: number, y2: number) {
    // this.ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
  }

  drawCircle(
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
    anticlockwise: boolean = false
  ) {
    this.ctx.strokeStyle = CANVAS_CLOCK_STROKE_COLOR;
    const startAngleRad = (Math.PI / 180) * startAngle;
    const endAngleRad = (Math.PI / 180) * endAngle;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, startAngleRad, endAngleRad, anticlockwise);
    this.ctx.stroke();
  }
}
