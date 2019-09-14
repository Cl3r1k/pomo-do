import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stat-history',
    templateUrl: './stat-history.component.html',
    styleUrls: ['./stat-history.component.scss']
})
export class StatHistoryComponent implements OnInit {

    weeklyCumulationCount = 0;
    dailyGoalCount = 0;
    allPomosCount = 0;
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
