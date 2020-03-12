import { Component, OnInit, Input } from '@angular/core';

// Constants
import { WORK_DAYS } from '@app/_constants/constants';

@Component({
  selector: 'app-weekly-days-chart',
  templateUrl: './weekly-days-chart.component.html',
  styleUrls: ['./weekly-days-chart.component.scss']
})
export class WeeklyDaysChartComponent implements OnInit {

  // *** Inputs ***
  @Input() workDaysStatsPercents: number[];

  WEEK_DAYS_SHORT = WORK_DAYS.weekDaysShort;

  constructor() {}

  ngOnInit() {}
}
