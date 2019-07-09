export class SettingsData {
    // As far this class used to store data in 'localStorage' here used Snake_case notation for variables
    play_sound_work_state: boolean;
    play_sound_alarm_state: boolean;
    notification_state: boolean;
    time_type_state: boolean;
    current_daily_goal: number;
    current_weekly_goal: number;
    current_monthly_goal: number;
    pro_status: boolean;

    constructor() {
        //
    }

    isUndefined(): boolean {
        return !this.play_sound_work_state ||
            !this.play_sound_alarm_state ||
            !this.notification_state ||
            !this.time_type_state ||
            !this.current_daily_goal ||
            !this.current_weekly_goal ||
            !this.current_monthly_goal ||
            !this.pro_status;
    }
}
