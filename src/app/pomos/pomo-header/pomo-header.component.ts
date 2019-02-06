import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Services
import { PomoStateService } from '@app/_services/pomo-state.service';

@Component({
    selector: 'app-pomo-header',
    templateUrl: './pomo-header.component.html',
    styleUrls: ['./pomo-header.component.scss']
})
export class PomoHeaderComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() pomoStartedStatusPomoHeader: boolean;

    @Output() startPomoHeaderComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    timerId;
    counter = 0;

    constructor(private _pomoStateService: PomoStateService) { }

    ngOnInit() {
        this._pomoStateService.loadPomoState();

        if (this._pomoStateService.pomoState) {
            console.log('%cpomoState: ', this.consoleTextColorComponent, this._pomoStateService.pomoState);

            const currentTime = new Date();
            // console.log('%ccurrentTime: ', this.consoleTextColorComponent, currentTime);
            // console.log('%cend_time: ', this.consoleTextColorComponent, new Date(this._pomoStateService.pomoState.end_time));
            if (this._pomoStateService.pomoState.status === 'started') {
                if (new Date(this._pomoStateService.pomoState.end_time) > currentTime) {
                    this.pomoStartedStatusPomoHeader = true;    // TODO: Change this part to new type (number - 2)
                }
            }
        }
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
