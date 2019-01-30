import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-pomo-header',
    templateUrl: './pomo-header.component.html',
    styleUrls: ['./pomo-header.component.scss']
})
export class PomoHeaderComponent implements OnInit {

    @Input() pomoStartedStatusPomoHeader: boolean;

    @Output() startPomoHeaderComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    timerId: number;

    constructor() { }

    ngOnInit() {
    }

    startPomo() {
        this.startPomoHeaderComponentEmitter.emit(true);    // Emit the 'startPomo' event to 'PomosComponent'
        this.startTimer();
    }

    startTimer() {
        //
    }

}
