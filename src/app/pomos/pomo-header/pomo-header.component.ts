import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-pomo-header',
    templateUrl: './pomo-header.component.html',
    styleUrls: ['./pomo-header.component.scss']
})
export class PomoHeaderComponent implements OnInit {

    @Output() startPomoPomoHeaderComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    pomoStarted = false;

    constructor() { }

    ngOnInit() {
    }

    startPomo() {
        this.startPomoPomoHeaderComponentEmitter.emit(true);    // Emit the 'startPomo' event to 'PomosComponent'
    }

}
