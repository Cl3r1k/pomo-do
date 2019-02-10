import { Injectable } from '@angular/core';

// Models
import { PomoState } from '@app/_models/pomo-state';

// Imports
import { v4 as uuidv4 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class PomoStateService {

    consoleTextColorService = 'color: salmon;';

    pomoLength = 1;    // Constant value from prefs TODO: change for real value from prefs
    pomoState: PomoState;

    pomos: [] = [];

    constructor() { }

    initPomoState() {

        this.pomoState = new PomoState();

        const startTime = new Date();
        const endTime = new Date();
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
        this.pomoState.status = 'idle';
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
        console.log('%cPomoStatusService - saveCompletedPomo: ', this.consoleTextColorService, pomoName);
    }
}
