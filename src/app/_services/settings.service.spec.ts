import { TestBed } from '@angular/core/testing';

// Services
import { SettingsService } from './settings.service';

describe('Service: SettingsService', () => {

    let service: SettingsService;

    beforeEach(() => {
        TestBed.configureTestingModule({});

        service = TestBed.get(SettingsService);
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
});
