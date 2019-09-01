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

    constructor() { }

    ngOnInit() {
    }

}
