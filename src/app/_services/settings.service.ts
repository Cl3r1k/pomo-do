import { Injectable } from '@angular/core';

// Models
import { SettingsData } from '@app/_models/settings-data';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    settingsData: SettingsData;
    keyForLocalStorage = 'settings_data';

    constructor() { }

    initSettings() {
        this.settingsData = null;
        this.settingsData = new SettingsData();
        this.settingsData.play_sound_work_state = false;
        this.settingsData.play_sound_alarm_state = false;
        this.settingsData.notification_state = false;
        this.settingsData.time_type_state = false;
        this.settingsData.current_daily_goal = 8;
        this.settingsData.current_weekly_goal = 40;
        this.settingsData.current_monthly_goal = 160;
        this.settingsData.pro_status = false;
    }

    loadSettings(): SettingsData {
        const data = JSON.parse(localStorage.getItem(this.keyForLocalStorage));

        if (data) {
            this.settingsData = null;
            this.settingsData = new SettingsData();
            this.settingsData.play_sound_work_state = data['play_sound_work_state'];
            this.settingsData.play_sound_alarm_state = data['play_sound_alarm_state'];
            this.settingsData.notification_state = data['notification_state'];
            this.settingsData.time_type_state = data['time_type_state'];
            this.settingsData.current_daily_goal = data['current_daily_goal'];
            this.settingsData.current_weekly_goal = data['current_weekly_goal'];
            this.settingsData.current_monthly_goal = data['current_monthly_goal'];
            this.settingsData.pro_status = data['pro_status'];
        }

        if (this.settingsData.isUndefined()) {
            this.settingsData = null;
        }
        return this.settingsData;
    }

    saveSettings(settingsData: SettingsData) {
        localStorage.setItem(this.keyForLocalStorage, JSON.stringify(settingsData));
    }
}
