import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Utils
import * as canvasUtils from '@app/_utils/canvasUtils';

// Constants
import {
  CANVAS_SIZE,
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
    const centerPoint = CANVAS_SIZE / 2;
    const circleRadius = CANVAS_SIZE * 0.35;
    const markStart = CANVAS_SIZE * 0.37;
    const markLength = 5;
    const markAngle = 360 / HOURS_IN_DAY;

    this.ctx = this.canvas.nativeElement.getContext('2d');
    // canvasUtils.drawRect(0, 0, 20, this.ctx);
    canvasUtils.drawClocks(
      centerPoint,
      circleRadius,
      markStart,
      markLength,
      markAngle,
      this.ctx
    );
    this.drawArcTriangles();
  }

  drawArcTriangles() {
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

    // drawClockArcedTriangle();

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
}
