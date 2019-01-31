import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

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

    constructor() { }

    ngOnInit() {
    }

    startPomo() {
        this.startPomoHeaderComponentEmitter.emit(true);    // Emit the 'startPomo' event to 'PomosComponent'
        this.resetCounter();
        this.startTimer();
    }

    startTimer() {
        this.printNumbersInterval();
        // this.timerId = setInterval(() => {
        //     this.counter--;

        //     if (this.counter <= 0) {
        //         clearInterval(this.timerId);
        //     }
        // }, 1000);
    }

    resetCounter() {
        this.counter = 10;    // Default value for 'Pomo'
    }

    printNumbersInterval() {
        let tmpVal = 0;

        // this.timerId = setInterval(() => {
        //     tmpVal++;
        //     console.log(tmpVal);

        //     if (tmpVal >= 20) {
        //         clearInterval(this.timerId);
        //     }
        // }, 100);

        this.timerId = setTimeout(function timer() {
            tmpVal++;
            console.log(tmpVal);

            if (tmpVal < 20) {
                setTimeout(timer, 100);
            }
        }, 100);
    }

}
