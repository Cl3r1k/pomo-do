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

    weeklyCumulationCount = 0;
    dailyGoalCount = 0;
    allTodosCount = 0;
    currentSelectedItem = 0;
    // TODO: Don't forget to change value below to real value from prefs
    dailyGoalCountPrefs = 8;

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
