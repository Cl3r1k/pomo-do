import { Component, OnInit, Input } from '@angular/core';

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

    @Input() recentPomos: Pomo[];
    @Input() todos: ToDo[];
    @Input() dailyGoalList: Pomo[];
    @Input() weeklyCumulationList: Pomo[];
    @Input() weeklyCumulationChartValues: number[];
    @Input() dailyGoalCountPercent: number;

    weeklyCumulationCount = 0;
    allTodosCount = 0;
    currentSelectedItem = 0;
    // TODO: Don't forget to change value below to real value from prefs
    dailyGoalCountPrefs = 8;
    polylinePoints = '0,70 7.6,68, 15.2,66, 22.8,64, 30.4,62 38,60 45.6,58, 53.2,56, 60.8,54, 68.4,52 ' +
            '76,50 83.6,48, 91.2,46, 98.8,44, 106.4,42 114,40 121.6,38, 129.2,36, 136.8,34, 144.4,32 ' +
            '152,30 159.6,28, 167.2,26, 174.8,24, 182.4,22 190,20 197.6,18, 205.2,14, 224,07, 240,01 240,70';

    constructor() { }

    ngOnInit() {
    }

    setSelectedItem(currentSelectedItemValue) {
        if (this.currentSelectedItem === currentSelectedItemValue) {
            this.currentSelectedItem = 0;
        } else {
            this.currentSelectedItem = currentSelectedItemValue;
        }
    }

}
