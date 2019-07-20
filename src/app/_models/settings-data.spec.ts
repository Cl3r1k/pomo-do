import { TestBed, async } from '@angular/core/testing';

import { SettingsData } from '@app/_models/settings-data';

describe(`Model: SettingsData`, () => {
    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(new SettingsData()).toBeTruthy();
    }));

    it(`Should have initial vaules after init (async)`, async(() => {
        // Arrange
        let settingsData: SettingsData;

        // Act
        settingsData = new SettingsData();

        // Assert
        expect(settingsData.play_sound_work_state).toEqual(undefined);
        expect(settingsData.play_sound_alarm_state).toEqual(undefined);
        expect(settingsData.notification_state).toEqual(undefined);
        expect(settingsData.time_type_state).toEqual(undefined);
        expect(settingsData.current_daily_goal).toEqual(undefined);
        expect(settingsData.current_weekly_goal).toEqual(undefined);
        expect(settingsData.current_monthly_goal).toEqual(undefined);
        expect(settingsData.pro_status).toEqual(undefined);
    }));

    describe(`#isUndefined()`, () => {
        it(`Should return 'true' if at least one of the members is undefined`, () => {
            // Arrange
        let settingsData: SettingsData;

        // Act
        settingsData = new SettingsData();
        settingsData.play_sound_work_state = false;
        settingsData.play_sound_alarm_state = false;
        settingsData.time_type_state = false;
        settingsData.current_daily_goal = 1;
        settingsData.current_weekly_goal = 2;
        settingsData.current_monthly_goal = 3;
        settingsData.pro_status = false;

        // Assert
        expect(settingsData.isUndefined()).toEqual(true);
        });

        it(`Should return 'false' if all of the members are defined`, () => {
            // Arrange
        let settingsData: SettingsData;

        // Act
        settingsData = new SettingsData();
        settingsData.play_sound_work_state = false;
        settingsData.play_sound_alarm_state = false;
        settingsData.notification_state = false;
        settingsData.time_type_state = false;
        settingsData.current_daily_goal = 1;
        settingsData.current_weekly_goal = 2;
        settingsData.current_monthly_goal = 3;
        settingsData.pro_status = false;

        // Assert
        expect(settingsData.isUndefined()).toEqual(false);
        });
    });
});
