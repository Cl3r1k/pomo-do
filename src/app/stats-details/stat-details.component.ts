import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Constants
import { WORK_DAYS } from '@app/_constants/constants';

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
  @Input() bestWorkHours: string;
  @Input() dayTimeLabel: string;
  @Input() hoursData: Object[];

  // *** Output emitters ***
  @Output() selectedHashtagStatDetailsComponentEmitter: EventEmitter<string> = new EventEmitter();

  readonly WORK_DAYS = WORK_DAYS;

  constructor() { }

  ngOnInit() { }

  onToggleSelectedChartPart(selectedHashtag: string) {
    this.selectedHashtagStatDetailsComponentEmitter.emit(selectedHashtag);
  }

}
