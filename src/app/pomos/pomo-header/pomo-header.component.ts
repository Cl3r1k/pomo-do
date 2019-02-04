import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Services
import { PomoStateService } from '@app/_services/pomo-state.service';

@Component({
    selector: 'app-pomo-header',
    templateUrl: './pomo-header.component.html',
    styleUrls: ['./pomo-header.component.scss']
})
export class PomoHeaderComponent implements OnInit {

    @Input() pomoStartedStatusPomoHeader: boolean;

    @Output() startPomoHeaderComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    timerId;
    counter = 0;

    constructor(private _pomoStateService: PomoStateService) { }

    ngOnInit() {
    }

    startPomo() {
        this.startPomoHeaderComponentEmitter.emit(true);    // Emit the 'startPomo' event to 'PomosComponent'
        this.resetCounter();
        this.startTimer();
    }

    startTimer() {
        this._pomoStateService.initPomoState();

        this.timerId = setInterval(() => {
            this.counter--;
            document.title = this.counter + ' - Pomodo';

            if (this.counter <= 0) {
                clearInterval(this.timerId);
                document.title = 'Pomodo';
                this.startPomoHeaderComponentEmitter.emit(false);    // Emit the 'startPomo' event to 'PomosComponent'
            }
        }, 1000);
    }

    resetCounter() {
        this.counter = 10;    // Default value for 'Pomo'
    }

}
