import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-stat-details',
  templateUrl: './stat-details.component.html',
  styleUrls: ['./stat-details.component.scss']
})
export class StatDetailsComponent implements OnInit {

  // *** Inputs ***
  @Input() bestWorkDay: string;
  @Input() aboveAveragePercent: string;
  @Input() workDaysStatsPercents: number[];
  @Input() topHashtagName: string;
  @Input() hashtagsChartValues: Object[];

  // *** Output emitters ***
  @Output() selectedHashtagStatDetailsComponentEmitter: EventEmitter<string> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onToggleSelectedChartPart(selectedHashtag: string) {
    this.selectedHashtagStatDetailsComponentEmitter.emit(selectedHashtag);
  }

}
