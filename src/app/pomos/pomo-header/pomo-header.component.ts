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

    @Input() pomoStatePomoHeader: number;

    @Output() statePomoHeaderComponentEmitter: EventEmitter<number> = new EventEmitter();

    pomoLength = 60;    // Constant value from prefs TODO: change for real value from prefs (in seconds)
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
                    this.pomoStatePomoHeader = 1;
                    // As far OnInit takes some time, to handle issues we delay emit event
                    setTimeout(() => {
                        this.statePomoHeaderComponentEmitter.emit(1);    // Emit the 'statePomo' event to 'PomosComponent'
                    }, 100);

                    const end_time = new Date(this._pomoStateService.pomoState.end_time);
                    const timeLeft = end_time.getTime() - currentTime.getTime();
                    console.log('%cend_time: ', this.consoleTextColorComponent, this._pomoStateService.pomoState.end_time);
                    console.log('%ccurrentTime: ', this.consoleTextColorComponent, currentTime.toISOString());
                    console.log('%ctimeLeft: ', this.consoleTextColorComponent, timeLeft);

                    const secondsLeft = Math.floor((timeLeft / 1000) % 60);
                    const minutesLeft = Math.floor(((timeLeft / 1000) / 60) % 60);
                    console.log('%cseconds: ', this.consoleTextColorComponent, secondsLeft);
                    console.log('%cminutes: ', this.consoleTextColorComponent, minutesLeft);
                    this.counter = secondsLeft;
                    this.startTimer();
                } else {
                    this.pomoStatePomoHeader = 2;
                    // As far OnInit takes some time, to handle issues we delay emit event
                    setTimeout(() => {
                        this.statePomoHeaderComponentEmitter.emit(2);    // Emit the 'statePomo' event to 'PomosComponent'
                    }, 100);
                }
            }
        }
    }

    startPomo() {
        this.statePomoHeaderComponentEmitter.emit(1);    // Emit the 'statePomo' event to 'PomosComponent'
        this.resetCounter();
        this._pomoStateService.initPomoState();
        this.startTimer();
    }

    startTimer() {
        this.counter--;
        this.timerId = setInterval(() => {
            this.counter--;
            document.title = this.counter + ' - Pomodo';

            if (this.counter <= 0) {
                clearInterval(this.timerId);
                document.title = 'Pomodo';
                this.statePomoHeaderComponentEmitter.emit(2);    // Emit the 'statePomo' event to 'PomosComponent'
            }
        }, 1000);
    }

    resetCounter() {
        this.counter = this.pomoLength;    // Default value for 'Pomo'
    }

    cancelPomo() {
        console.log('%ccancelPomo() called', this.consoleTextColorComponent);
        clearInterval(this.timerId);
        this.statePomoHeaderComponentEmitter.emit(0);    // Emit the 'statePomo' event to 'PomosComponent'
        this.resetCounter();
        this._pomoStateService.interruptPomo();
    }

}
