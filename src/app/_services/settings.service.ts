import { Injectable } from '@angular/core';

// Models
import { SettingsData } from '@app/_models/settings-data';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    keyForLocalStorage = 'settings_data';
    settingsData = null;

    constructor() { }

    loadSettings() {
        const data = JSON.parse(localStorage.getItem(this.keyForLocalStorage));

        if (data) {
            this.settingsData = null;
            this.settingsData = new SettingsData();
            // this.settingsData.start_time = data['start_time'];
            // this.settingsData.end_time = data['end_time'];
            // this.settingsData.rest_time = data['rest_time'];
            // this.settingsData.status = data['status'];
            // this.settingsData.uuid = data['uuid'];
        }
    }

    saveSettings(settingsData: SettingsData) {
        localStorage.setItem(this.keyForLocalStorage, JSON.stringify(settingsData));
    }
}
