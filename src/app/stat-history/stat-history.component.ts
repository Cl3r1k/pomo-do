import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { Pomo } from '@app/_models/pomo';
import { ToDo } from '@app/_models/to-do';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
  selector: 'app-stat-history',
  templateUrl: './stat-history.component.html',
  styleUrls: ['./stat-history.component.scss']
})
export class StatHistoryComponent implements OnInit {

  // *** Inputs ***
  @Input() recentPomos: Pomo[];
  @Input() todosCompleted: ToDo[];
  @Input() dailyGoalList: Pomo[];
  @Input() weeklyCumulationList: Pomo[];
  @Input() weeklyCumulationChartValues: number[];
  @Input() dailyGoalCountPercent: number;
  @Input() monthlyPomosPolylinePoints: string;
  @Input() monthlyTodosPolylinePoints: string;
  @Input() bestWorkDay: string;
  @Input() aboveAveragePercent: string;
  @Input() workDaysStatsPercents: number[];
  @Input() topHashtagName: string;
  @Input() hashtagsChartValues: Object[];
  @Input() bestWorkHours: string;
  @Input() dayTimeLabel: string;
  @Input() hoursData: Object[];

  // *** Output emitters ***
  @Output() selectedHashtagStatHistoryComponentEmitter: EventEmitter<string> = new EventEmitter();

  weeklyCumulationCount = 0;
  allTodosCount = 0;
  currentSelectedItem = 0;
  // TODO: Don't forget to change value below to real value from prefs
  dailyGoalCountPrefs = 8;

  constructor() { }

  ngOnInit() { }

  setSelectedItem(currentSelectedItemValue) {
    if (this.currentSelectedItem === currentSelectedItemValue) {
      this.currentSelectedItem = 0;
    } else {
      this.currentSelectedItem = currentSelectedItemValue;
    }
  }

  onToggleSelectedChartPart(selectedHashtag: string) {
    // console.log('onToggleSelectedChartPart() selectedHashtag: ', selectedHashtag);
    this.selectedHashtagStatHistoryComponentEmitter.emit(selectedHashtag);
  }

}
