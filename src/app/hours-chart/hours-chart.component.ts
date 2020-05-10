import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Utils
import * as canvasUtils from '@app/_utils/canvasUtils';

// Constants
import { CANVAS_SIZE, HOURS_IN_DAY } from '@app/_constants/constants';

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
    const markStart = CANVAS_SIZE * 0.38;
    const markLength = 4;
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

    const triangleRadius = CANVAS_SIZE * 0.34;
    // * `hoursData` mockup
    const hoursData = [
      { startHour: 6, startMinute: 0, endHour: 6, endMinute: 25 },
      { startHour: 8, startMinute: 0, endHour: 8, endMinute: 25 },
      { startHour: 8, startMinute: 10, endHour: 8, endMinute: 35 },
      { startHour: 8, startMinute: 20, endHour: 8, endMinute: 45 },
      { startHour: 8, startMinute: 30, endHour: 8, endMinute: 55 },
      { startHour: 9, startMinute: 0, endHour: 9, endMinute: 25 },
      { startHour: 9, startMinute: 21, endHour: 9, endMinute: 46 },
      { startHour: 9, startMinute: 30, endHour: 9, endMinute: 55 },
      { startHour: 10, startMinute: 0, endHour: 10, endMinute: 25 },
      { startHour: 10, startMinute: 0, endHour: 10, endMinute: 25 },
      { startHour: 10, startMinute: 30, endHour: 10, endMinute: 55 },
      { startHour: 10, startMinute: 30, endHour: 10, endMinute: 55 },
      { startHour: 10, startMinute: 30, endHour: 10, endMinute: 55 },
      { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
      { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
      { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
      { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
    ];

    canvasUtils.drawArcedTriangles(
      this.ctx,
      centerPoint,
      triangleRadius,
      hoursData
    );
  }
}
