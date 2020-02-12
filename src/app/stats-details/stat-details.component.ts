import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss']
})
export class StatDetailsComponent implements OnInit {

  @Input() bestWorkDay: string;
  @Input() aboveAveragePercent: string;
  @Input() workDaysStatsPercents: number[];
  @Input() topHashtagName: string;
  @Input() hashtagsChartValues: Object[];

  @Output() selectedHashtaStatDetailsComponentEmitter: EventEmitter<string> = new EventEmitter();

  weeklyCumulationChartValues = [2, 2, 2, 5, 10, 50, 70];
  weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  selected = -1;

  // hashtagsChartValues = [
  //     {
  //         'tagName': '#dev',
  //         'pathD': 'M 248.4807753012208 167.36481776669302 A 100 100 0 0 0 150 50 L 150 150 Z',
  //     },
  //     {
  //         'tagName': '#English',
  //         'pathD': 'M 236.60254037844388 100 A 100 100 0 0 0 150 50 L 150 150 Z',
  //     },
  //     {
  //         'tagName': '#tagName',
  //         'pathD': 'M 184.20201433256688 56.03073792140917 A 100 100 0 0 0 150 50 L 150 150 Z',
  //     },
  //     {
  //         'tagName': '#smallTag',
  //         'pathD': 'M 184.20201433256688 56.03073792140917 A 100 100 0 0 0 150 50 L 150 150 Z',
  //     }
  // ];

  constructor() {
  }

  ngOnInit() {
  }

  toggleSelectedChartPart(selectedIndex: number) {
    // (mouseover)="selected = i" (mouseout)="selected = -1"
    this.selected = selectedIndex !== this.selected ? selectedIndex : -1;
    const selectedHashtag = this.selected >= 0 ? this.hashtagsChartValues[this.selected]['tagName'] : undefined;
    this.selectedHashtaStatDetailsComponentEmitter.emit(selectedHashtag);
  }

}
