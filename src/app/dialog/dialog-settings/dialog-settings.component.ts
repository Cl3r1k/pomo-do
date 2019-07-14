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

            // TODO: Perform request to service and change values
            //


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
        this.saveSettingsDelayed();
    }

    saveTimeTypeState(state: boolean) {
        this.timeTypeSaveState = true;
        this.saveSettingsDelayed();
    }

    saveSettings() {
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
        if (this.notificationSaveState) {
            // setTimeout(() => {
            //     this.notificationSaveText = 'Saved';
            //     setTimeout(() => {
            //         this.notificationSaveState = false;
            //         this.notificationSaveText = 'Saving';
            //     }, 2000);
            // }, 3000);
            console.log('%c notificationSaveState is true', this.consoleTextColorComponent);
            this.notificationSaveText = 'Saved';
            console.log('%c notificationSaveState changed execute setTimeout()', this.consoleTextColorComponent);
            setTimeout(() => {
                this.notificationSaveState = false;
                this.notificationSaveText = 'Saving';
            }, 2000);
        }

        // TODO: Check case: Click 'checkbox1'? click 'checkbox2', when status chaned to 'Saved' instantly click 'checkbox1'
        // The settings should be saved again, e.g. called 'saveSettingsDelayed()' -> 'saveSettings()' and should be started 'setTimeout'

        if (this.timeTypeSaveState) {
            // console.log('%c timeTypeSaveState is true execute setTimeout()', this.consoleTextColorComponent);
            // setTimeout(() => {
            //     this.timeTypeSaveText = 'Saved';
            //     console.log('%c timeTypeSaveText changed execute setTimeout()', this.consoleTextColorComponent);
            //     setTimeout(() => {
            //         this.timeTypeSaveState = false;
            //         this.timeTypeSaveText = 'Saving';
            //         console.log('%c timeTypeSaveState set to false', this.consoleTextColorComponent);
            //     }, 2000);
            // }, 3000);
            console.log('%c timeTypeSaveState is true', this.consoleTextColorComponent);
            this.timeTypeSaveText = 'Saved';
            console.log('%c timeTypeSaveText changed execute setTimeout()', this.consoleTextColorComponent);
            setTimeout(() => {
                this.timeTypeSaveState = false;
                this.timeTypeSaveText = 'Saving';
                console.log('%c timeTypeSaveState set to false', this.consoleTextColorComponent);
            }, 2000);
        }
    }

    saveSettingsDelayed() {
        if (this.updatePending) {
            clearInterval(this.interval);
        }

        this.updatePending = true;
        this.interval = setInterval(() => {
            console.log('%c-->Pefrorm saveSettings()', this.consoleTextColorComponent);
            this.saveSettings();
            clearInterval(this.interval);
        }, 3000);
    }

}
