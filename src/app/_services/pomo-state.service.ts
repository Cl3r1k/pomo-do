import { Injectable } from '@angular/core';

// Models
import { PomoState } from '@app/_models/pomo-state';
import { Pomo } from '@app/_models/pomo';

// Services
import { IndexedDbService } from '@app/_services/indexed-db.service';

// Modules
import { Utils } from '@app/_common/utils';

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
    recentPomosView = [];

    constructor(private _indexedDbService: IndexedDbService, private _utils: Utils) { }

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

    interruptPomo(isRestState: boolean) {
        this.setIdlePomoState();
        this.pomoState.end_time = new Date().toISOString();

        if (!isRestState) {
            this.saveCompletedPomo('');
        }

        this.savePomoState();
    }

    setIdlePomoState() {
        this.pomoState.status = 'idle';
    }

    saveCompletedPomo(pomoName: string) {
        // console.log('%cPomoStatusService - saveCompletedPomo: ', this.consoleTextColorService, pomoName);

        const isInterrupted = pomoName === '' ? true : false;
        const recentPomo = new Pomo(pomoName, this.pomoState.start_time, this.pomoState.uuid, isInterrupted);
        recentPomo.end_time = this.pomoState.end_time;    // Set 'end_time' manually from 'pomoState'
        recentPomo.duration = ((new Date(recentPomo.end_time)).getTime() - (new Date(recentPomo.start_time)).getTime()) / 1000;
        // console.log('%cPomoStatusService - recentPomo: ', this.consoleTextColorService, recentPomo);

        let pomoLength = 0;
        if (isInterrupted) {
            pomoLength = (new Date(recentPomo.end_time)).getTime() - (new Date(recentPomo.start_time)).getTime();
            // console.log('%cPomoStatusService - pomoLength: ', this.consoleTextColorService, pomoLength);
        }

        if (pomoLength === 0 || pomoLength / 1000 > 30) {    // If spend time for pomo before interrupt is less than 30 seconds, skip it
            this._indexedDbService.savePomo(recentPomo).subscribe(isSaved => {
                // console.log('%cPomoStateService - isSaved: ', this.consoleTextColorService, isSaved);
                if (isSaved) {
                    this.recentPomos.push(recentPomo);
                    this.generatePomoListView();
                    this.savePomoList();
                    // console.log('%cPomoStatusService - recentPomos: ', this.consoleTextColorService, this.recentPomos);

                    if (isInterrupted) {
                        this.setIdlePomoState();
                    } else {
                        this.pomoState.status = 'resting';
                        this.pomoState.rest_time = new Date().toISOString();
                    }
                    this.savePomoState();
                }
            });
        }
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

        this._indexedDbService.getLastHundredCompletedPomos().subscribe(allPomos => {
            console.log('%cPomoStateService - allPomos: ', this.consoleTextColorService, allPomos);

            const data = JSON.parse(localStorage.getItem('recentPomoList'));

            if (allPomos.length) {
                this.recentPomos = [];

                const tmpRecentPomos: Pomo[] = [];

                if (data) {
                    console.log('%cPomoStatusService{loadPomoList()} - pomos: ', this.consoleTextColorService, data['pomos']);

                    // TODO: Return to this part and improve, after object will be more learned
                    Object.keys(data['pomos']).forEach(key => {
                        const item = data['pomos'][key];

                        const tmpPomo = new Pomo(item['title'], item['start_time'], item['uuid'], item['canceled']);
                        tmpPomo.id = item['id'];
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

                        tmpRecentPomos.push(tmpPomo);
                    });
                }

                console.log('%c PomoStatusService{loadPomoList()} - tmpRecentPomos: ', this.consoleTextColorService, tmpRecentPomos);
                console.log('%c PomoStatusService{loadPomoList()} - allPomos: ', this.consoleTextColorService, allPomos);
                const compareResult = this._utils.isEqualArrayOfObjects(allPomos, tmpRecentPomos);
                if (!compareResult) {
                    this.recentPomos = allPomos;
                    this.savePomoList();
                } else {
                    // tslint:disable-next-line:max-line-length
                    console.log('%c PomoStatusService{loadPomoList()} - allPomos.length === tmpRecentPomos.length : ', this.consoleTextColorService);
                    this.recentPomos = tmpRecentPomos;
                }

                console.log('%cPomoStatusService{loadPomoList()} - recentPomos: ', this.consoleTextColorService, this.recentPomos);
                this.generatePomoListView();
            }
        });

    }

    generatePomoListView() {

        if (this.recentPomos.length) {
            // Firstly - filter canceled 'pomos'
            const filteredRecentPomosList = this.recentPomos.filter(item => {
                return !item.canceled;
            });

            let dateGroup;
            const options = {
                month: 'short',
                day: 'numeric'
            };

            const resultPomosArray = [];
            let pomosArray = [];
            let pomosCount = 0;

            for (let i = 0; i < filteredRecentPomosList.length; i++) {
                const pomoItem = filteredRecentPomosList[i];
                const tmpDateTime = new Date(pomoItem.end_time);
                const tmpDateGroup = tmpDateTime.toLocaleString('en-US', options);

                if (tmpDateGroup !== dateGroup) {
                    if (dateGroup !== undefined) {
                        pomosCount = this.getPomosCount(pomosArray);
                        pomosArray.reverse();
                        const resultPomosGroup = { dateGroup: dateGroup, pomosCount: pomosCount, pomosArray: pomosArray };
                        resultPomosArray.push(resultPomosGroup);
                    }

                    // Clear data for next 'day'
                    dateGroup = tmpDateGroup;
                    pomosArray = [];
                }

                const startLocalHrsMins = new Date(pomoItem.start_time);
                const endLocalHrsMins = new Date(pomoItem.end_time);
                const tmpStart = ('00' + startLocalHrsMins.getHours()).slice(-2) + ':' + ('00' + startLocalHrsMins.getMinutes()).slice(-2);
                const tmpEnd = ('00' + endLocalHrsMins.getHours()).slice(-2) + ':' + ('00' + endLocalHrsMins.getMinutes()).slice(-2);
                // tslint:disable-next-line:max-line-length
                const startTimeToView = startLocalHrsMins.toLocaleString() + ' +' + ('00' + -(startLocalHrsMins.getTimezoneOffset() / 60)).slice(-2) + ':00';
                // tslint:disable-next-line:max-line-length
                const endTimeToView = endLocalHrsMins.toLocaleString() + ' +' + ('00' + -(endLocalHrsMins.getTimezoneOffset() / 60)).slice(-2) + ':00';
                const pomoObj = {
                    title: pomoItem.title,
                    start_time: pomoItem.start_time,
                    end_time: pomoItem.end_time,
                    start_time_view: startTimeToView,
                    end_time_view: endTimeToView,
                    start_short_time: tmpStart,
                    end_short_time: tmpEnd,
                    counter: 1
                };

                let isSeries = false;
                if (pomosArray.length > 0) {
                    const tmpPrevPomoObj = pomosArray[pomosArray.length - 1];
                    if (tmpPrevPomoObj['title'] === pomoObj['title'] && tmpPrevPomoObj['counter'] < 4) {
                        const tmpPrevPomoEndTime = new Date(tmpPrevPomoObj['end_time']);
                        const pomoObjStartTime = new Date(pomoObj.start_time);
                        // console.log('%c tmpPrevPomoEndTime', this.consoleTextColorService, tmpPrevPomoEndTime);
                        // console.log('%c pomoObjEndTime', this.consoleTextColorService, pomoObjEndTime);
                        const diffTime = pomoObjStartTime.getTime() - tmpPrevPomoEndTime.getTime();
                        // console.log('%c diffTime', this.consoleTextColorService, diffTime);
                        const minutesDiff = diffTime / 1000 / 60;
                        // console.log('%c minutesDiff', this.consoleTextColorService, minutesDiff);

                        // Let's check rest time between pomos for restTime*5
                        if (minutesDiff <= this.restLength * 5) {
                            pomosArray[pomosArray.length - 1]['counter']++;
                            pomosArray[pomosArray.length - 1]['end_time'] = pomoObj['end_time'];
                            pomosArray[pomosArray.length - 1]['end_short_time'] = pomoObj['end_short_time'];
                            isSeries = true;
                        }
                    }
                }

                if (!isSeries) {
                    pomosArray.push(pomoObj);
                }

                if (i === filteredRecentPomosList.length - 1) {
                    // Save last data in array
                    pomosCount = this.getPomosCount(pomosArray);
                    pomosArray.reverse();
                    const resultPomosGroup = { dateGroup: dateGroup, pomosCount: pomosCount, pomosArray: pomosArray };
                    resultPomosArray.push(resultPomosGroup);
                }

                // console.log('%c pomoObj', this.consoleTextColorService, pomoObj);
            }

            console.log('%c resultPomosArray', 'color: red;', resultPomosArray);

            resultPomosArray.reverse();

            this.recentPomosView = resultPomosArray;
        }

    }

    getPomosCount(pomosArray): number {
        let result = 0;

        pomosArray.map(item => {
            result += item['counter'];
        });

        return result;
    }
}
