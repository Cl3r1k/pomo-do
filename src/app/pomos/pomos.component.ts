import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pomos',
    templateUrl: './pomos.component.html',
    styleUrls: ['./pomos.component.scss']
})
export class PomosComponent implements OnInit {

    @Input() pomoStatusPomos: boolean;

    @Output() startPomosComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onStartPomo(state: boolean) {
        this.startPomosComponentEmitter.emit(state);
    }

}
