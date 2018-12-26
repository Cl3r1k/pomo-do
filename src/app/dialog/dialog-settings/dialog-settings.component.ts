import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Imports
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { distinctUntilChanged, debounceTime, map } from 'rxjs/operators';

@Component({
    selector: 'app-dialog-settings',
    templateUrl: './dialog-settings.component.html',
    styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    currentTab = 0;
    playSoundWorkState = false;
    playSoundWorkSaveState = false;
    playSoundWorkSaveText = 'Saving';
    playSoundAlarmState = false;
    playSoundAlarmSaveState = false;
    playSoundAlarmSaveText = 'Saving';
    notificationState = false;
    notificationSaveState = false;
    notificationSaveText = 'Saving';
    timeTypeState = false;
    timeTypeSaveState = false;
    timeTypeSaveText = 'Saving';
    currentDailyGoal = 8;
    dailyGoalSaveState = false;
    dailyGoalSaveText = 'Saving';
    currentWeeklyGoal = 40;
    currentMonthlyGoal = 160;

    public formGoal: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DialogSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _formBuilder: FormBuilder,
    ) {

        this.formGoal = _formBuilder.group({
            dailyGoal: ['', Validators.required],
            weeklyGoal: ['', Validators.required],
            monthlyGoal: ['', Validators.required],
        });

        // Set initial values
        this.formGoal.controls['dailyGoal'].setValue(this.currentDailyGoal);
        this.formGoal.controls['weeklyGoal'].setValue(this.currentWeeklyGoal);
        this.formGoal.controls['monthlyGoal'].setValue(this.currentMonthlyGoal);

        // Subscribe to changes
        this.formGoal.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
        ).subscribe(value => {
            console.log('%cform changed value: ', this.consoleTextColorComponent, value);

            if (value['dailyGoal'] !== this.currentDailyGoal) {
                this.dailyGoalSaveState = true;
                setTimeout(() => {
                    this.currentDailyGoal = value['dailyGoal'];
                    this.dailyGoalSaveText = 'Saved';
                    setTimeout(() => {
                        this.dailyGoalSaveState = false;
                        this.dailyGoalSaveText = 'Saving';
                    }, 2000);
                }, 3000);
            }
        });
    }

    ngOnInit() {
        console.log('%cdata: ', this.consoleTextColorComponent, this.data);
    }

    changeCurrentTab(tabIndex: number) {
        this.currentTab = tabIndex;
    }

    savePlaySoundWorkState(state: boolean) {
        this.playSoundWorkSaveState = true;
        setTimeout(() => {
            this.playSoundWorkSaveText = 'Saved';
            setTimeout(() => {
                this.playSoundWorkSaveState = false;
                this.playSoundWorkSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

    savePlaySoundAlarmState(state: boolean) {
        this.playSoundAlarmSaveState = true;
        setTimeout(() => {
            this.playSoundAlarmSaveText = 'Saved';
            setTimeout(() => {
                this.playSoundAlarmSaveState = false;
                this.playSoundAlarmSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

    saveNotificationState(state: boolean) {
        this.notificationSaveState = true;
        setTimeout(() => {
            this.notificationSaveText = 'Saved';
            setTimeout(() => {
                this.notificationSaveState = false;
                this.notificationSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

    saveTimeTypeState(state: boolean) {
        this.timeTypeSaveState = true;
        setTimeout(() => {
            this.timeTypeSaveText = 'Saved';
            setTimeout(() => {
                this.timeTypeSaveState = false;
                this.timeTypeSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

}
