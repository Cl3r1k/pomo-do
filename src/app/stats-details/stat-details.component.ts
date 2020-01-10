import { Component, OnInit, Input } from '@angular/core';

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

    weeklyCumulationChartValues = [2, 2, 2, 5, 10, 50, 70];
    weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    hashtagsChartValues = {
        '#dev': 'M 248.4807753012208 167.36481776669302 A 100 100 0 0 0 150 50 L 150 150 Z',
        '#English': 'M 236.60254037844388 100 A 100 100 0 0 0 150 50 L 150 150 Z',
        '#tagName': 'M 184.20201433256688 56.03073792140917 A 100 100 0 0 0 150 50 L 150 150 Z',
        '#smallTag': 'M 184.20201433256688 56.03073792140917 A 100 100 0 0 0 150 50 L 150 150 Z'
    };

    constructor() { }

    ngOnInit() {
    }

}
