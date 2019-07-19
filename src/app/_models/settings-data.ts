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
        return this.play_sound_work_state === undefined ||
            this.play_sound_alarm_state === undefined ||
            this.notification_state === undefined ||
            this.time_type_state === undefined ||
            this.current_daily_goal === undefined ||
            this.current_weekly_goal === undefined ||
            this.current_monthly_goal === undefined ||
            this.pro_status === undefined;
    }
}
