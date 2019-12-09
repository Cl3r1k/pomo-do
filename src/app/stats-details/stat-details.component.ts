import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-stat-details',
    templateUrl: './stat-details.component.html',
    styleUrls: ['./stat-details.component.scss']
})
export class StatDetailsComponent implements OnInit {

    @Input() bestWorkDay: string;
    @Input() aboveAveragePercent: string;

    weeklyCumulationChartValues = [2, 2, 2, 5, 10, 50, 70];
    weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    constructor() { }

    ngOnInit() {
    }

}
