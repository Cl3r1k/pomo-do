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

    @Input() pomoStatusPomoHeader: number;

    @Output() startPomoHeaderComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    pomoLength = 10;    // Constant value from prefs TODO: change for real value from prefs (in seconds)
    timerId;
    counter = this.pomoLength;

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
                    this.pomoStatusPomoHeader = 1;    // TODO: Change this part to new type (number - 2)

                    const endTime = new Date(this._pomoStateService.pomoState.end_time);
                    // const timeLeft = Math.abs(endTime - currentTime);
                } else {
                    this.pomoStatusPomoHeader = 2;
                }
            }
        }
    }

    startPomo() {
        this.startPomoHeaderComponentEmitter.emit(true);    // Emit the 'startPomo' event to 'PomosComponent'
        this.resetCounter();
        this._pomoStateService.initPomoState();
        this.startTimer();
    }

    startTimer() {
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
        this.counter = this.pomoLength;    // Default value for 'Pomo'
    }

}
