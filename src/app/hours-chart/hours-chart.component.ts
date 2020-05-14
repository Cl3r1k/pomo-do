import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, SimpleChanges } from '@angular/core';

// Utils
import * as canvasUtils from '@app/_utils/canvasUtils';

// Constants
import { CANVAS_SETTINGS } from '@app/_constants/constants';

@Component({
  selector: 'app-hours-chart',
  templateUrl: './hours-chart.component.html',
  styleUrls: ['./hours-chart.component.scss'],
})
export class HoursChartComponent implements OnInit, OnChanges {

  // *** Inputs ***
  @Input() hoursData: Object[];

  @ViewChild('canvas') canvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('<HoursChartComponent> ngOnChanges() changes: ', changes.hoursData.currentValue);

    // Clear previous draw on the Canvas
    canvasUtils.clearCanvas(this.ctx, 0, 0, CANVAS_SETTINGS.CANVAS_SIZE, CANVAS_SETTINGS.CANVAS_SIZE);

    // Draw Clock's template on the canvas
    canvasUtils.drawClocks(
      CANVAS_SETTINGS.CENTER_POINT,
      CANVAS_SETTINGS.CIRCLE_RADIUS,
      CANVAS_SETTINGS.MARK_START,
      CANVAS_SETTINGS.MARK_LENGTH,
      CANVAS_SETTINGS.MARK_ANGLE,
      this.ctx
    );

    // * `hoursData` mockup
    // const hoursData = [
    //   { startHour: 6, startMinute: 0, endHour: 6, endMinute: 25 },
    //   { startHour: 8, startMinute: 0, endHour: 8, endMinute: 25 },
    //   { startHour: 8, startMinute: 10, endHour: 8, endMinute: 35 },
    //   { startHour: 8, startMinute: 20, endHour: 8, endMinute: 45 },
    //   { startHour: 8, startMinute: 30, endHour: 8, endMinute: 55 },
    //   { startHour: 9, startMinute: 0, endHour: 9, endMinute: 25 },
    //   { startHour: 9, startMinute: 21, endHour: 9, endMinute: 46 },
    //   { startHour: 9, startMinute: 30, endHour: 9, endMinute: 55 },
    //   { startHour: 10, startMinute: 0, endHour: 10, endMinute: 25 },
    //   { startHour: 10, startMinute: 0, endHour: 10, endMinute: 25 },
    //   { startHour: 10, startMinute: 30, endHour: 10, endMinute: 55 },
    //   { startHour: 10, startMinute: 30, endHour: 10, endMinute: 55 },
    //   { startHour: 10, startMinute: 30, endHour: 10, endMinute: 55 },
    //   { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
    //   { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
    //   { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
    //   { startHour: 11, startMinute: 0, endHour: 11, endMinute: 25 },
    // ];

    canvasUtils.drawArcedTriangles(
      this.ctx,
      CANVAS_SETTINGS.CENTER_POINT,
      CANVAS_SETTINGS.TRIANGLE_RADIUS,
      changes.hoursData.currentValue
    );
  }
}
