import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pomos',
    templateUrl: './pomos.component.html',
    styleUrls: ['./pomos.component.scss']
})
export class PomosComponent implements OnInit {

    @Input() pomoStatePomos: number;

    @Output() statePomosComponentEmitter: EventEmitter<number> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onStatePomoChange(state: number) {
        this.statePomosComponentEmitter.emit(state);
    }

}
