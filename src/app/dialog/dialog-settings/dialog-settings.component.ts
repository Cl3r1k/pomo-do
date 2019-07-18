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

    interval;
    updatePending = false;
    dailyGoalSaveStatePending = false;
    dailyGoalSaveStateInterval;
    weeklyGoalSaveStatePending = false;
    weeklyGoalSaveStateInterval;
    monthlyGoalSaveStatePending = false;
    monthlyGoalSaveStateInterval;
    playSoundWorkSaveStatePending = false;
    playSoundWorkSaveStateInterval;
    playSoundAlarmSaveStatePending = false;
    playSoundAlarmSaveStateInterval;
    notificationSaveStatePending = false;
    notificationSaveStateInterval;
    timeTypeSaveStatePending = false;
    timeTypeSaveStateInterval;

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

        // console.log('%c settingsData: ', this.consoleTextColorComponent, settingsData);
        if (!settingsData) {
            _settingsService.initSettings();
            _settingsService.saveSettings(_settingsService.settingsData);
            settingsData = _settingsService.settingsData;
        }

        this.playSoundWorkState = settingsData.play_sound_work_state;
        this.playSoundAlarmState = settingsData.play_sound_alarm_state;
        this.notificationState = settingsData.notification_state;
        this.timeTypeState = settingsData.time_type_state;
        this.currentDailyGoal = settingsData.current_daily_goal;
        this.currentWeeklyGoal = settingsData.current_weekly_goal;
        this.currentMonthlyGoal = settingsData.current_monthly_goal;
        this.proStatus = settingsData.pro_status;

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

            if (value['dailyGoal'] && value['dailyGoal'] !== this.currentDailyGoal) {
                this.dailyGoalSaveState = true;
                this.currentDailyGoal = value['dailyGoal'];
                this.saveSettingsDelayed();
            }

            if (value['weeklyGoal'] && value['weeklyGoal'] !== this.currentWeeklyGoal) {
                this.weeklyGoalSaveState = true;
                this.currentWeeklyGoal = value['dailyGoal'];
                this.saveSettingsDelayed();
            }

            if (value['monthlyGoal'] && value['monthlyGoal'] !== this.currentMonthlyGoal) {
                this.monthlyGoalSaveState = true;
                this.currentMonthlyGoal = value['dailyGoal'];
                this.saveSettingsDelayed();
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
        this.saveSettingsDelayed();
    }

    savePlaySoundAlarmState(state: boolean) {
        this.playSoundAlarmSaveState = true;
        this.saveSettingsDelayed();
    }

    saveNotificationState(state: boolean) {
        this.notificationSaveState = true;
        this.saveSettingsDelayed();
    }

    saveTimeTypeState(state: boolean) {
        this.timeTypeSaveState = true;
        this.saveSettingsDelayed();
    }

    saveSettings() {
        // TODO: Perform request to service and change values

        const settingsData: SettingsData = new SettingsData();
        settingsData.play_sound_work_state = this.playSoundWorkState;
        settingsData.play_sound_alarm_state = this.playSoundAlarmState;
        settingsData.notification_state = this.notificationState;
        settingsData.time_type_state = this.timeTypeState;
        settingsData.current_daily_goal = this.currentDailyGoal;
        settingsData.current_weekly_goal = this.currentWeeklyGoal;
        settingsData.current_monthly_goal = this.currentMonthlyGoal;
        settingsData.pro_status = this.proStatus;

        this._settingsService.saveSettings(settingsData);

        // Reset save-states for fields
        if (this.dailyGoalSaveState) {
            this.dailyGoalSaveText = 'Saved';
            this.dailyGoalSaveStatePending = true;
            this.dailyGoalSaveStateInterval = setInterval(() => {
                this.dailyGoalSaveState = false;
                this.dailyGoalSaveText = 'Saving';
                this.dailyGoalSaveStatePending = false;
                clearInterval(this.dailyGoalSaveStateInterval);
            }, 2000);
        }

        if (this.weeklyGoalSaveState) {
            this.weeklyGoalSaveText = 'Saved';
            this.weeklyGoalSaveStatePending = true;
            this.weeklyGoalSaveStateInterval = setInterval(() => {
                this.weeklyGoalSaveState = false;
                this.weeklyGoalSaveText = 'Saving';
                this.weeklyGoalSaveStatePending = false;
                clearInterval(this.weeklyGoalSaveStateInterval);
            }, 2000);
        }

        if (this.monthlyGoalSaveState) {
            this.monthlyGoalSaveText = 'Saved';
            this.monthlyGoalSaveStatePending = true;
            this.monthlyGoalSaveStateInterval = setInterval(() => {
                this.monthlyGoalSaveState = false;
                this.monthlyGoalSaveText = 'Saving';
                this.monthlyGoalSaveStatePending = false;
                clearInterval(this.monthlyGoalSaveStateInterval);
            }, 2000);
        }

        if (this.playSoundWorkSaveState) {
            this.playSoundWorkSaveText = 'Saved';
            this.playSoundWorkSaveStatePending = true;
            this.playSoundWorkSaveStateInterval = setInterval(() => {
                this.playSoundWorkSaveState = false;
                this.playSoundWorkSaveText = 'Saving';
                this.playSoundWorkSaveStatePending = false;
                clearInterval(this.playSoundWorkSaveStateInterval);
            }, 2000);
        }

        if (this.playSoundAlarmSaveState) {
            this.playSoundAlarmSaveText = 'Saved';
            this.playSoundAlarmSaveStatePending = true;
            this.playSoundAlarmSaveStateInterval = setInterval(() => {
                this.playSoundAlarmSaveState = false;
                this.playSoundAlarmSaveText = 'Saving';
                this.playSoundAlarmSaveStatePending = false;
                clearInterval(this.playSoundAlarmSaveStateInterval);
            }, 2000);
        }

        if (this.notificationSaveState) {
            this.notificationSaveText = 'Saved';
            this.notificationSaveStatePending = true;
            this.notificationSaveStateInterval = setInterval(() => {
                this.notificationSaveState = false;
                this.notificationSaveText = 'Saving';
                this.notificationSaveStatePending = false;
                clearInterval(this.notificationSaveStateInterval);
            }, 2000);
        }

        if (this.timeTypeSaveState) {
            // console.log('%c timeTypeSaveState is true', this.consoleTextColorComponent);
            this.timeTypeSaveText = 'Saved';
            this.timeTypeSaveStatePending = true;
            // console.log('%c timeTypeSaveText changed execute setInterval()', this.consoleTextColorComponent);
            this.timeTypeSaveStateInterval = setInterval(() => {
                // console.log('%c executed setInterval() for timeTypeSaveState', this.consoleTextColorComponent);
                // console.log('%c timeTypeSaveState: ', this.timeTypeSaveState);
                // console.log('%c timeTypeSaveText: ', this.timeTypeSaveText);
                // console.log('%c this.updatePending', 'color: red;', this.updatePending);
                this.timeTypeSaveState = false;
                this.timeTypeSaveText = 'Saving';
                this.timeTypeSaveStatePending = false;
                clearInterval(this.timeTypeSaveStateInterval);
                // console.log('%c timeTypeSaveState set to false', this.consoleTextColorComponent);
            }, 2000);
        }
    }

    saveSettingsDelayed() {
        if (this.updatePending) {
            clearInterval(this.interval);
        }

        if (this.dailyGoalSaveState) {
            this.dailyGoalSaveText = 'Saving';
            clearInterval(this.dailyGoalSaveStateInterval);
        }

        if (this.weeklyGoalSaveState) {
            this.weeklyGoalSaveText = 'Saving';
            clearInterval(this.weeklyGoalSaveStateInterval);
        }

        if (this.monthlyGoalSaveState) {
            this.monthlyGoalSaveText = 'Saving';
            clearInterval(this.monthlyGoalSaveStateInterval);
        }

        if (this.playSoundWorkSaveState) {
            this.playSoundWorkSaveText = 'Saving';
            clearInterval(this.playSoundWorkSaveStateInterval);
        }

        if (this.playSoundAlarmSaveStatePending) {
            this.playSoundAlarmSaveText = 'Saving';
            clearInterval(this.playSoundAlarmSaveStateInterval);
        }

        if (this.notificationSaveStatePending) {
            this.notificationSaveText = 'Saving';
            clearInterval(this.notificationSaveStateInterval);
        }

        if (this.timeTypeSaveStatePending) {
            this.timeTypeSaveText = 'Saving';
            clearInterval(this.timeTypeSaveStateInterval);
        }

        this.updatePending = true;
        this.interval = setInterval(() => {
            // this.updatePending = false;
            console.log('%c-->Pefrorm saveSettings()', this.consoleTextColorComponent);
            this.saveSettings();
            clearInterval(this.interval);
        }, 3000);
    }

}
