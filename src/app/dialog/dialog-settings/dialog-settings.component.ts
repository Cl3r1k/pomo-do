import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Models
import { SettingsData } from '@app/_models/settings-data';

// Services
import { SettingsService } from '@app/_services/settings.service';

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
    weeklyGoalSaveState = false;
    weeklyGoalSaveText = 'Saving';
    currentMonthlyGoal = 160;
    monthlyGoalSaveState = false;
    monthlyGoalSaveText = 'Saving';
    proStatus = false;

    public formGoal: FormGroup;

    constructor(
        public dialogRef: MatDialogRef<DialogSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _formBuilder: FormBuilder,
        private _settingsService: SettingsService
    ) {

        this.formGoal = _formBuilder.group({
            dailyGoal: ['', Validators.required],
            weeklyGoal: ['', Validators.required],
            monthlyGoal: ['', Validators.required],
        });

        // TODO: Here we should read data form 'SettingsService' and save it in component fields,
        // If there is no any data, then we should save initial values in 'SettingsService'
        // For 'settings-data' exchange we should use separate 'SettingsData' class
        let settingsData: SettingsData = this._settingsService.loadSettings();

        if (!settingsData) {
            _settingsService.initSettings();
            _settingsService.saveSettings(_settingsService.settingsData);
            settingsData = _settingsService.settingsData;
        }

        this.playSoundWorkState = settingsData.playSoundWorkState;
        this.playSoundAlarmState = settingsData.playSoundAlarmState;
        this.notificationState = settingsData.notificationState;
        this.timeTypeState = settingsData.timeTypeState;
        this.currentDailyGoal = settingsData.currentDailyGoal;
        this.currentWeeklyGoal = settingsData.currentWeeklyGoal;
        this.currentMonthlyGoal = settingsData.currentMonthlyGoal;
        this.proStatus = settingsData.proStatus;

        // Set initial values
        this.formGoal.controls['dailyGoal'].setValue(this.currentDailyGoal);
        this.formGoal.controls['weeklyGoal'].setValue(this.currentWeeklyGoal);
        this.proStatus ? this.formGoal.controls['weeklyGoal'].enable() : this.formGoal.controls['weeklyGoal'].disable();
        this.formGoal.controls['monthlyGoal'].setValue(this.currentMonthlyGoal);
        this.proStatus ? this.formGoal.controls['monthlyGoal'].enable() : this.formGoal.controls['monthlyGoal'].disable();

        // Subscribe to changes
        this.formGoal.valueChanges.pipe(
            debounceTime(1000),
            distinctUntilChanged(),
        ).subscribe(value => {
            console.log('%cform changed value: ', this.consoleTextColorComponent, value);

            // TODO: Perform request to backEnd and change values
            if (value['dailyGoal'] && value['dailyGoal'] !== this.currentDailyGoal) {
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

            if (value['weeklyGoal'] && value['weeklyGoal'] !== this.currentWeeklyGoal) {
                this.weeklyGoalSaveState = true;
                setTimeout(() => {
                    this.currentWeeklyGoal = value['dailyGoal'];
                    this.weeklyGoalSaveText = 'Saved';
                    setTimeout(() => {
                        this.weeklyGoalSaveState = false;
                        this.weeklyGoalSaveText = 'Saving';
                    }, 2000);
                }, 3000);
            }

            if (value['monthlyGoal'] && value['monthlyGoal'] !== this.currentMonthlyGoal) {
                this.monthlyGoalSaveState = true;
                setTimeout(() => {
                    this.currentMonthlyGoal = value['dailyGoal'];
                    this.monthlyGoalSaveText = 'Saved';
                    setTimeout(() => {
                        this.monthlyGoalSaveState = false;
                        this.monthlyGoalSaveText = 'Saving';
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
