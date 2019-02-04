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

    pomoLength = 25;    // Constant value from prefs TODO: change for real value from prefs
    pomoState: PomoState;

    constructor() { }

    initPomoState() {

        this.pomoState = new PomoState();

        const startTime = new Date();
        this.pomoState.start_time = startTime.toISOString();

        // this.pomoState.end_time = new Date();
        // const end_time = new Date();
        // end_time.setMinutes(start_time.getMinutes() + this.pomoLength);

        // this.pomoState['start_time'] = start_time;
        // this.pomoState['end_time'] = end_time;
        // this.pomoState['status'] = 'started';
        // this.pomoState['uuid'] = uuidv4();            // Generate new UUID

        console.log('%cPomoStatusService - pomoState: ', this.consoleTextColorService, this.pomoState);

        // this.savePomoState();
    }

    savePomoState() {
        localStorage.setItem('app_pomo_state', JSON.stringify(this.pomoState));
    }

    loadPomoState() {
        const data = JSON.parse(localStorage.getItem('app_pomo_state'));

        if (data) {
            // Parse data...
        }
    }
}
