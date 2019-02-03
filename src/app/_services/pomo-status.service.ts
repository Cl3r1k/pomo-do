import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PomoStatusService {

    pomoLength = 25;    // Constant value from prefs TODO: change for real value from prefs

    constructor() { }

    initPomoStatus() {

        let pomoStatus: Object;
        const start_time = new Date();
        const end_time = new Date();
        end_time.setMinutes(start_time.getMinutes() + this.pomoLength);

        pomoStatus = {
            start_time: start_time.toISOString(),
            end_time: end_time.toISOString()
        };

    }
}
