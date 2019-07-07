import { Injectable } from '@angular/core';

// Models
import { SettingsData } from '@app/_models/settings-data';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    settingsData: SettingsData = null;
    keyForLocalStorage = 'settings_data';

    constructor() { }

    initSettings() {
        this.settingsData.playSoundWorkState = false;
        this.settingsData.playSoundAlarmState = false;
        this.settingsData.notificationState = false;
        this.settingsData.timeTypeState = false;
        this.settingsData.currentDailyGoal = 8;
        this.settingsData.currentWeeklyGoal = 40;
        this.settingsData.currentMonthlyGoal = 160;
        this.settingsData.proStatus = false;
    }

    loadSettings(): SettingsData {
        const data = JSON.parse(localStorage.getItem(this.keyForLocalStorage));

        if (data) {
            this.settingsData = null;
            this.settingsData = new SettingsData();
            this.settingsData.playSoundWorkState = data['play_sound_work_state'];
            this.settingsData.playSoundAlarmState = data['play_sound_alarm_state'];
            this.settingsData.notificationState = data['notification_state'];
            this.settingsData.timeTypeState = data['time_type_state'];
            this.settingsData.currentDailyGoal = data['current_daily_goal'];
            this.settingsData.currentWeeklyGoal = data['current_weekly_goal'];
            this.settingsData.currentMonthlyGoal = data['current_monthly_goal'];
            this.settingsData.proStatus = data['pro_status'];
        }

        return this.settingsData;
    }

    saveSettings(settingsData: SettingsData) {
        localStorage.setItem(this.keyForLocalStorage, JSON.stringify(settingsData));
    }
}
