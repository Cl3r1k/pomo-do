import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stat-details',
    templateUrl: './stat-details.component.html',
    styleUrls: ['./stat-details.component.scss']
})
export class StatDetailsComponent implements OnInit {

    weeklyCumulationChartValues = [1, 1, 2, 5, 10, 50, 70];

    constructor() { }

    ngOnInit() {
    }

}
