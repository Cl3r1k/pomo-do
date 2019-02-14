import { Injectable } from '@angular/core';

// Models
import { PomoState } from '@app/_models/pomo-state';
import { Pomo } from '@app/_models/pomo';

// Imports
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class PomoStateService {

    consoleTextColorService = 'color: salmon;';

    pomoLength = 1;    // Constant value from prefs TODO: change for real value from prefs
    restLength = 1;    // Constant value from prefs TODO: change for real value from prefs
    pomoState: PomoState;

    recentPomos: Pomo[] = [];

    constructor() { }

    initPomoState() {

        this.pomoState = new PomoState();

        const startTime = new Date();
        const endTime = new Date();
        startTime.setMilliseconds(0);
        endTime.setMilliseconds(0);
        endTime.setMinutes(startTime.getMinutes() + this.pomoLength);
        this.pomoState.start_time = startTime.toISOString();
        this.pomoState.end_time = endTime.toISOString();
        this.pomoState.status = 'started';
        this.pomoState.uuid = uuidv4();            // Generate new UUID

        console.log('%cPomoStatusService - pomoState: ', this.consoleTextColorService, this.pomoState);

        this.savePomoState();
    }

    savePomoState() {
        localStorage.setItem('app_pomo_state', JSON.stringify(this.pomoState));
    }

    loadPomoState() {
        const data = JSON.parse(localStorage.getItem('app_pomo_state'));

        if (data) {
            this.pomoState = null;
            this.pomoState = new PomoState();
            this.pomoState.start_time = data['start_time'];
            this.pomoState.end_time = data['end_time'];
            this.pomoState.status = data['status'];
            this.pomoState.uuid = data['uuid'];
        }
    }

    interruptPomo() {
        this.pomoState.status = 'idle';
        this.pomoState.end_time = new Date().toISOString();
        this.savePomoState();
    }

    saveCompletedPomo(pomoName: string) {
        // console.log('%cPomoStatusService - saveCompletedPomo: ', this.consoleTextColorService, pomoName);
        const recentPomo = new Pomo(pomoName, this.pomoState.start_time, this.pomoState.uuid, false);
        // console.log('%cPomoStatusService - recentPomo: ', this.consoleTextColorService, recentPomo);

        this.recentPomos.push(recentPomo);
        this.savePomoList();
        // console.log('%cPomoStatusService - recentPomos: ', this.consoleTextColorService, this.recentPomos);

        // TODO:
        // We shouldn't change 'startTime' and 'endTime', just start timer from original 'endTime'
        // After timer finished change 'status' to 'idle'
        this.pomoState.status = 'resting';
        const startTime = new Date();
        const endTime = new Date();
        startTime.setMilliseconds(0);
        endTime.setMilliseconds(0);
        endTime.setMinutes(startTime.getMinutes() + this.restLength);
        this.pomoState.start_time = startTime.toISOString();
        this.pomoState.end_time = endTime.toISOString();
        this.savePomoState();

        // TODO: Save pomo in IndexedDb
    }

    savePomoList() {
        let data = Object();

        data = {
            account_id: '123456',
            pomos: this.recentPomos
        };

        localStorage.setItem('recentPomoList', JSON.stringify(data));
    }
}
