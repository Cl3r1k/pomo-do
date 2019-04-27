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
    recentPomosView: Object = {};

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
        this.pomoState.rest_time = null;
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
            this.pomoState.rest_time = data['rest_time'];
            this.pomoState.status = data['status'];
            this.pomoState.uuid = data['uuid'];
        }
    }

    interruptPomo() {
        this.setIdlePomoState();
        this.pomoState.end_time = new Date().toISOString();
        this.savePomoState();
    }

    setIdlePomoState() {
        this.pomoState.status = 'idle';
    }

    saveCompletedPomo(pomoName: string) {
        // console.log('%cPomoStatusService - saveCompletedPomo: ', this.consoleTextColorService, pomoName);
        const recentPomo = new Pomo(pomoName, this.pomoState.start_time, this.pomoState.uuid, false);
        recentPomo.end_time = this.pomoState.end_time;    // Set 'end_time' manually from 'pomoState'
        // console.log('%cPomoStatusService - recentPomo: ', this.consoleTextColorService, recentPomo);

        this.recentPomos.push(recentPomo);
        this.generatePomoListView();
        this.savePomoList();
        // console.log('%cPomoStatusService - recentPomos: ', this.consoleTextColorService, this.recentPomos);

        this.pomoState.status = 'resting';
        this.pomoState.rest_time = new Date().toISOString();
        this.savePomoState();

        // TODO: Save pomo in IndexedDb
    }

    savePomoList() {
        let data = Object();

        data = {
            account_id: '123456',    // TODO: Use real value for 'account_id'
            pomos: this.recentPomos
        };

        localStorage.setItem('recentPomoList', JSON.stringify(data));
    }

    loadPomoList() {
        const data = JSON.parse(localStorage.getItem('recentPomoList'));

        if (data) {
            this.recentPomos = [];
            console.log('%cPomoStatusService{loadPomoList()} - pomos: ', this.consoleTextColorService, data['pomos']);

            // TODO: Return to this part and improve, after object will be learned more
            Object.keys(data['pomos']).forEach(key => {
                const item = data['pomos'][key];

                const tmpPomo = new Pomo(item['title'], item['start_time'], item['uuid'], item['canceled']);
                tmpPomo.created_time = item['created_time'];
                tmpPomo.deleted = item['deleted'];
                tmpPomo.deleted_time = item['deleted_time'];
                tmpPomo.duration = item['duration'];
                tmpPomo.end_time = item['end_time'];
                tmpPomo.manual = item['manual'];
                tmpPomo.title = item['title'];
                tmpPomo.updated_time = item['updated_time'];
                tmpPomo.__accound_id = item['__accound_id'];
                tmpPomo.__dirty = item['__dirty'];
                tmpPomo._local_created_time = item['_local_created_time'];
                tmpPomo._local_updated_time = item['_local_updated_time'];
                tmpPomo._local_end_time = item['_local_end_time'];
                tmpPomo._local_start_time = item['_local_start_time'];
                tmpPomo._local_deleted_time = item['_local_deleted_time'];

                this.recentPomos.push(tmpPomo);
            });

            console.log('%cPomoStatusService{loadPomoList()} - recentPomos: ', this.consoleTextColorService, this.recentPomos);
            this.generatePomoListView();
        }
    }

    generatePomoListView() {

        if (this.recentPomos.length) {
            let dateGroup;
            const options = {
                month: 'short',
                day: 'numeric'
            };

            const resultPomosArray = [];
            let pomosArray = [];

            for (let i = 0; i < this.recentPomos.length; i++) {
                const pomoItem = this.recentPomos[i];
                const tmpDateTime = new Date(pomoItem.end_time);
                const tmpDateGroup = tmpDateTime.toLocaleString('en-US', options);

                if (tmpDateGroup !== dateGroup) {
                    if (dateGroup !== undefined) {
                        const resultPomosGroup = { dateGroup: dateGroup, pomosCount: pomosArray.length, pomosArray: pomosArray };
                        resultPomosArray.push(resultPomosGroup);
                    }

                    // Clear data for next 'day'
                    dateGroup = tmpDateGroup;
                    pomosArray = [];
                }

                const pomoObj = { title: pomoItem.title, start_time: pomoItem.start_time, end_time: pomoItem.end_time, counter: 1 };

                let isSeries = false;
                if (pomosArray.length > 0) {
                    const tmpPrevPomoObj = pomosArray[pomosArray.length - 1];
                    if (tmpPrevPomoObj['title'] === pomoObj['title'] && tmpPrevPomoObj['counter'] < 4) {
                        const tmpPrevPomoEndTime = new Date(tmpPrevPomoObj['end_time']);
                        const pomoObjStartTime = new Date(pomoObj.start_time);
                        // console.log('%c tmpPrevPomoEndTime', this.consoleTextColorService, tmpPrevPomoEndTime);
                        // console.log('%c pomoObjEndTime', this.consoleTextColorService, pomoObjEndTime);
                        const diffTime = pomoObjStartTime.getTime() - tmpPrevPomoEndTime.getTime();
                        console.log('%c diffTime', this.consoleTextColorService, diffTime);
                        const minutesDiff = diffTime / 1000 / 60;
                        console.log('%c minutesDiff', this.consoleTextColorService, minutesDiff);

                        // Let's check rest time between pomos for restTime*5
                        if (minutesDiff <= this.restLength * 5) {
                            pomosArray[pomosArray.length - 1]['counter']++;    // TODO: Stopped here, counter not increased in final obj
                            isSeries = true;
                        }
                    }
                }

                if (!isSeries) {
                    pomosArray.push(pomoObj);
                }

                if (i === this.recentPomos.length - 1) {
                    // Save last data in array
                    const resultPomosGroup = { dateGroup: dateGroup, pomosCount: pomosArray.length, pomosArray: pomosArray };
                    resultPomosArray.push(resultPomosGroup);
                }

                console.log('%c pomoObj', this.consoleTextColorService, pomoObj);
            }

            console.log('%c resultPomosArray', 'color: red;', resultPomosArray);
        }

    }
}
