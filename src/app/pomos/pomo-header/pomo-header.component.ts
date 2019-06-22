import { Component, OnInit, Output, EventEmitter, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

// Services
import { PomoStateService } from '@app/_services/pomo-state.service';
import { PomoTitleService } from '@app/_services/pomo-title.service';

// Components
import { DialogCancelComponent } from '@app/dialog/dialog-cancel/dialog-cancel.component';

// Modules
import { MatDialog } from '@angular/material';

@Component({
    selector: 'app-pomo-header',
    templateUrl: './pomo-header.component.html',
    styleUrls: ['./pomo-header.component.scss']
})
export class PomoHeaderComponent implements OnInit, AfterViewChecked {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() pomoStatePomoHeader: number;
    @Input() currentTodoPomoHeader: ToDo;

    @Output() statePomoHeaderComponentEmitter: EventEmitter<number> = new EventEmitter();
    @Output() currentTodoSelectedPomoHeaderComponentEmitter: EventEmitter<ToDo> = new EventEmitter();

    pomoLengthSeconds = 60;    // Constant value from prefs TODO: change for real value from prefs (in seconds)
    restLengthSeconds = 60;    // Constant value from prefs TODO: change for real value from prefs (in seconds)
    timerId;
    counter = this.pomoLengthSeconds;
    counterView = '';
    currentState = 'pomo';
    progressBarPercent = 0;
    afterViewCheckedCount = 0;
    updatedTextHeight = false;
    savePomoFocusState = false;

    @ViewChild('textAreaElement') private texareaPomoNameElementRef: ElementRef;

    constructor(private _pomoStateService: PomoStateService, private _pomoTitleService: PomoTitleService, public dialog: MatDialog) { }

    ngOnInit() {
        // console.log('%ccurrentTodoPomoHeader: ', this.consoleTextColorComponent, this.currentTodoPomoHeader);
        this._pomoStateService.loadPomoState();
        this._pomoStateService.loadPomoList();

        if (this._pomoStateService.pomoState) {
            console.log('%cpomoState: ', this.consoleTextColorComponent, this._pomoStateService.pomoState);

            // console.log('%ccurrentTime: ', this.consoleTextColorComponent, currentTime);
            // console.log('%cend_time: ', this.consoleTextColorComponent, new Date(this._pomoStateService.pomoState.end_time));
            if (this._pomoStateService.pomoState.status === 'started' || this._pomoStateService.pomoState.status === 'resting') {

                const currentTime = new Date();
                currentTime.setMilliseconds(0);
                let endTime: Date;

                if (this._pomoStateService.pomoState.status === 'resting') {
                    endTime = new Date(this._pomoStateService.pomoState.rest_time);
                    endTime.setSeconds(endTime.getSeconds() + this.restLengthSeconds);
                    this.currentState = 'rest';
                } else {
                    endTime = new Date(this._pomoStateService.pomoState.end_time);
                }

                if (endTime > currentTime) {
                    this.pomoStatePomoHeader = 1;
                    // As far OnInit takes some time, to handle issues we delay emit event
                    setTimeout(() => {
                        this.emitPomoState(1, false);    // Emit the 'statePomo' event to 'PomosComponent' (progress)
                    }, 100);

                    const timeLeft = endTime.getTime() - currentTime.getTime();
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
                    const isRestFinished = this._pomoStateService.pomoState.status === 'resting';

                    if (isRestFinished) {
                        this._pomoStateService.setIdlePomoState();
                        this._pomoStateService.savePomoState();
                        this.pomoStatePomoHeader = 0;    // 0 - Show 'standby' view
                    } else {
                        this.pomoStatePomoHeader = 2;    // 2 - show 'save' view
                        document.title = '00:00 - Pomodo';
                    }

                    // Change status in service immediately
                    if (!isRestFinished) {
                        this._pomoTitleService.setPomoState(2, true, this.currentTodoPomoHeader);
                    }

                    // As far OnInit takes some time, to handle issues we delay emit event
                    // TODO: Solve the issue 'ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.'
                    setTimeout(() => {
                        if (isRestFinished) {
                            this.emitPomoState(0, false);    // Emit the 'statePomo' event to 'PomosComponent' (standby)
                        } else {
                            this.statePomoHeaderComponentEmitter.emit(2); // Emit 'statePomo' event to 'PomosComponent' (save)
                        }
                    }, 100);

                    this.currentState = 'pomo';
                }
            }
        }
    }

    ngAfterViewChecked() {
        // Workaround for autosize Textarea initial height

        if (this.afterViewCheckedCount >= 1) {
            if (!this.updatedTextHeight) {
                if (this.texareaPomoNameElementRef !== undefined) {
                    let el: HTMLElement;
                    el = this.texareaPomoNameElementRef.nativeElement;
                    el.style.height = '42px';

                    this.updatedTextHeight = true;
                }
            }
        } else {
            this.afterViewCheckedCount++;
        }
    }

    startPomo() {
        this.emitPomoState(1, false);    // Emit the 'statePomo' event to 'PomosComponent' (progress)
        this.resetCounter(false);
        this._pomoStateService.initPomoState();
        this.startTimer();
    }

    startRest() {
        this.emitPomoState(1, false);    // Emit the 'statePomo' event to 'PomosComponent' (progress)
        this.resetCounter(true);
        this.startTimer();
    }

    startTimer() {
        // this.counter--;
        console.log('%cthis.counter', this.consoleTextColorComponent, this.counter);
        console.log('%cthis.counterView', this.consoleTextColorComponent, this.counterView);
        this.timerId = setInterval(() => {
            this.counter--;
            // const minutes = Math.floor(this.counter / 60);
            // const seconds = this.counter % 60;
            // console.log('%cminutes: %d seconds: %d', this.consoleTextColorComponent, minutes, seconds);
            this.counterView = ('00' + Math.floor(this.counter / 60)).slice(-2) + ':' + ('00' + (this.counter % 60)).slice(-2);
            document.title = this.counterView + ' - Pomodo';
            this.progressBarPercent = 100 - Math.round(this.counter / (this.pomoLengthSeconds / 100));
            // console.log('%cprogressBarPercent', this.consoleTextColorComponent, this.progressBarPercent);

            if (this.counter <= 0) {
                clearInterval(this.timerId);
                this.progressBarPercent = 0;
                // document.title = 'Pomodo';
                if (this._pomoStateService.pomoState.status === 'resting') {
                    this.resetCounter(false);
                    this._pomoStateService.setIdlePomoState();
                    this._pomoStateService.savePomoState();
                    this.emitPomoState(0, false);    // Emit the 'statePomo' event to 'PomosComponent' (standby)
                } else {
                    this.emitPomoState(2, false);    // Emit the 'statePomo' event to 'PomosComponent' (save)
                    // TODO: Stopped here, should be processed pattern, 'pomo' started, page reloaded, after finish should be selected todo
                    // console.log('%c pomoTitle', this.consoleTextColorComponent, this._pomoTitleService.pomoTitle);
                    // console.log('%c pomoTitleManualPart', this.consoleTextColorComponent, this._pomoTitleService.pomoTitleManualPart);
                    // console.log('%c pomoTitleTodosPart', this.consoleTextColorComponent, this._pomoTitleService.pomoTitleTodosPart);
                    // console.log('%c this.currentTodoPomoHeader', this.consoleTextColorComponent, this.currentTodoPomoHeader);
                    // TODO: Emit info, that 'progress' finished, and prev-ly wasn't changed pomoTitle, so main component should process it
                    if (!this._pomoTitleService.pomoTitle
                        && !this._pomoTitleService.pomoTitleManualPart
                        && !this._pomoTitleService.pomoTitleTodosPart) {
                        this._pomoTitleService.setPomoState(2, true, this.currentTodoPomoHeader);
                        this.currentTodoSelectedPomoHeaderComponentEmitter.emit(this.currentTodoPomoHeader);
                    }
                }
            }
        }, 1000);
    }

    resetCounter(restState: boolean) {
        this.counter = restState ? this.restLengthSeconds : this.pomoLengthSeconds;    // Default value for 'Pomo' - pomo/rest
        // this.counter--;    // Optional, if time should be started from **:59 or **+1:00
        this.counterView = ('00' + Math.floor(this.counter / 60)).slice(-2) + ':' + ('00' + (this.counter % 60)).slice(-2);
        document.title = 'Pomodo';
        this.currentState = restState ? 'rest' : 'pomo';
    }

    cancelPomoClick() {
        console.log('%ccancelPomoClick() called', this.consoleTextColorComponent);

        if (this.currentState === 'pomo') {
            const dataForDialog = {
                dialogTitle: 'You are currently in a pomo, do you really want to interrupt it?'
            };

            const dialogRef = this.dialog.open(DialogCancelComponent, {
                width: '600px',
                data: dataForDialog
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result === 'Confirm') {
                    this.cancelPomo();    // User confirmed action, call 'cancelPomo()'
                } else {
                    // User clicked 'Cancel' or clicked outside of the dialog
                }
            });
        } else {
            this.cancelPomo();
        }
    }

    cancelPomo() {
        console.log('%ccancelPomo() called', this.consoleTextColorComponent);
        const isRestState = this.currentState === 'rest' ? true : false;
        clearInterval(this.timerId);
        this.emitPomoState(0, false);            // Emit the 'statePomo' event to 'PomosComponent' (standby)
        this.resetCounter(false);
        this._pomoStateService.interruptPomo(isRestState);
    }

    savePomo(event: KeyboardEvent) {
        if (this._pomoTitleService.pomoTitle) {
            this._pomoStateService.saveCompletedPomo(this._pomoTitleService.pomoTitle.trim());
            this.currentState = 'rest';
            // this._pomoTitleService.pomoTitle = '';
            this._pomoTitleService.resetTitleStateAfterSave();

            this.startRest();
        } else {
            console.log('%cpomoTitle: emtpy???', this.consoleTextColorComponent, this._pomoTitleService.pomoTitle);
            if (event !== undefined) {
                event.preventDefault();
            }
        }
    }

    setSavePomoFocus(state: boolean) {
        this.savePomoFocusState = state;
    }

    emitPomoState(state: number, isInitialStart: boolean, todo: ToDo = null) {
        // State === 0 --- standby
        // State === 1 --- progress
        // State === 2 --- save
        this.statePomoHeaderComponentEmitter.emit(state);
        this._pomoTitleService.setPomoState(state, isInitialStart, todo);
    }

    pomoTitleManualChange(event) {
        // console.log('%cpomoTitle changed manually!', this.consoleTextColorComponent);
        this._pomoTitleService.lockUsedTodos(true);
    }

}
