import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-hours-chart',
  templateUrl: './hours-chart.component.html',
  styleUrls: ['./hours-chart.component.scss']
})
export class HoursChartComponent implements OnInit {
  @ViewChild('canvas')
  canvas: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D;

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.drawCanvas();
    this.draw(1, 1, 20);
  }

  // * Here we first draw basic canvas image
  drawCanvas() {
    console.log('drawCanvas() called');
    this.ctx.fillStyle = 'teal';
    this.ctx.fillRect(10, 10, 30, 30);
  }

  draw(x: number, y: number, z: number) {
    this.ctx.fillStyle = 'blue';
    this.ctx.fillRect(z * x, z * y, z, z);
  }
}
