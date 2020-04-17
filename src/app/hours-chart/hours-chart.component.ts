import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Constants
import { CANVAS_SIZE, CANVAS_CLOCK_STROKE_COLOR } from '@app/_constants/constants';

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
    this.drawRect(1, 1, 20);
    this.drawClocks();
    this.drawTriangle(0, 0, 90, 30);
  }

  drawRect(x: number, y: number, z: number) {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(z * x, z * y, z, z);
  }

  drawClocks() {
    this.drawCircle(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE * 0.4, 0, 360);
    this.drawLine(CANVAS_SIZE / 2, CANVAS_SIZE / 2, CANVAS_SIZE, CANVAS_SIZE);
  }

  drawTriangle(x1: number, y1: number, length: number, angle: number) {
    // * For example we have Triangle ◺ABC
    // * where AB = AC = 90
    // * angle for height A = 30°
    // * angle for B and C = (180 - A) / 2 = (180 - 30) / 2 = 75°
    // * BC = 2 * AB * Cos(B) = 2 * 90 * 0.258819 = 46.587
    // * h = AB * sin (angle B) = 90 * sin(75°) = 86.933

    // * Coordinates: A = (0, 0), B = (90, 0), C = (???)
    // * Common formula:
    // * xC=x(A)+b*sin(alfa)
    // * yC=y(A)+b*cos(alfa)
    // * xC = 0 + 90 * sin(30°) = 0 + 90 * 0.5 = 45
    // * yC = 0 + 90 * cos(30°) = 0 + 90 * 0.866 = 77.94
    for (let i = 0; i <= 180; i += angle) {
      const angleRad = this.getAngleInRad(i);
      // const sin = Math.sin(i);
      const sinRad = Math.floor(Math.sin(angleRad) * 10000) / 10000;
      const cosRad = Math.floor(Math.cos(angleRad) * 10000) / 10000;
      // console.log(`sin(${i}°) = ${sin}`);
      console.log(`sinRad(${i}°) = ${sinRad}`);
      console.log(`cosRad(${i}°) = ${cosRad}`);
      const xC = x1 + length * sinRad;
      const yC = y1 + length * cosRad;
      console.log(`with angle ${i} C(${xC}, ${yC})`);
    }
  }

  getAngleInRad(angle) {
    return (Math.PI / 180) * angle;
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
