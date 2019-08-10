import { TestBed } from '@angular/core/testing';

// Services
import { SettingsService } from './settings.service';

// Models
import { SettingsData } from '@app/_models/settings-data';

// Mocks
import { LocalStorageMock } from '@app/_testing/localStorage-mock';

describe('Service: SettingsService', () => {

    let service: SettingsService;
    const store = {};

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(SettingsService);

        const localStorageMock = new LocalStorageMock();

        spyOn(localStorage, 'getItem').and.callFake(localStorageMock.localStorageMockObject.getItem);
        spyOn(localStorage, 'setItem').and.callFake(localStorageMock.localStorageMockObject.setItem);
    });

    it('Should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    it('Should have initial values', () => {
        // Arrange

        // Act

        // Assert
        expect(service.settingsData).toEqual(undefined);
        expect(service.keyForLocalStorage).toEqual('settings_data');
    });

    describe(`#initSettings()`, () => {
        it(`Should init 'settingsData'`, () => {
            // Arrange

            // Act
            service.initSettings();

            // Assert
            expect(service.settingsData.play_sound_work_state).toEqual(false);
            expect(service.settingsData.play_sound_alarm_state).toEqual(false);
            expect(service.settingsData.notification_state).toEqual(false);
            expect(service.settingsData.time_type_state).toEqual(false);
            expect(service.settingsData.current_daily_goal).toEqual(8);
            expect(service.settingsData.current_weekly_goal).toEqual(40);
            expect(service.settingsData.current_monthly_goal).toEqual(160);
            expect(service.settingsData.pro_status).toEqual(false);
        });
    });

    describe(`#loadSettings()`, () => {
        it(`Should set 'settingsData' saved in localStorage`, () => {
            // Arrange
            let tmpSettingsData: SettingsData;
            service.initSettings();
            tmpSettingsData = service.settingsData;
            service.saveSettings(tmpSettingsData);
            service.settingsData = null;

            // Act
            const result = service.loadSettings();

            // Assert
            expect(result.current_daily_goal).toEqual(tmpSettingsData.current_daily_goal);
        });

        it(`Should call 'getItem()' of localStorage`, () => {
            // Arrange

            // Act
            const result = service.loadSettings();

            // Assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });

        it(`Should return 'null' if on of 'settingsData' member is undefined`, () => {
            // Arrange
            let tmpSettingsData: SettingsData;
            service.initSettings();
            tmpSettingsData = service.settingsData;
            tmpSettingsData.play_sound_alarm_state = undefined;
            service.saveSettings(tmpSettingsData);
            service.settingsData = null;

            // Act
            const result = service.loadSettings();

            // Assert
            expect(result).toEqual(null);
        });
    });

    describe(`#saveSettings()`, () => {
        it(`Should store 'pomoState' in localStorage`, () => {
            // Arrange
            let tmpSettingsData: SettingsData;
            service.initSettings();
            tmpSettingsData = service.settingsData;

            // Act
            service.saveSettings(tmpSettingsData);

            // Assert
            expect(localStorage.getItem(service.keyForLocalStorage)).toEqual(JSON.stringify(service.settingsData));
        });

        it(`Should call 'setItem()' of localStorage`, () => {
            // Arrange
            let tmpSettingsData: SettingsData;
            service.initSettings();
            tmpSettingsData = service.settingsData;

            // Act
            service.saveSettings(tmpSettingsData);

            // Assert
            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });
});
