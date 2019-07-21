import { Injectable } from '@angular/core';

// Models
import { SettingsData } from '@app/_models/settings-data';

@Injectable()
export class SettingsMockService {

    settingsData: SettingsData;

    constructor() { }

    public initSettings() { }

    public loadSettings(): SettingsData {
        this.settingsData = null;
        this.settingsData = new SettingsData();
        this.settingsData.play_sound_work_state = false;
        this.settingsData.play_sound_alarm_state = false;
        this.settingsData.notification_state = false;
        this.settingsData.time_type_state = false;
        this.settingsData.current_daily_goal = 1;
        this.settingsData.current_weekly_goal = 2;
        this.settingsData.current_monthly_goal = 3;
        this.settingsData.pro_status = false;

        return this.settingsData;
    }

    public saveSettings() { }

}
