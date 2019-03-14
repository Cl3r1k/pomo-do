import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class PomoTitleService {

    currentPomoState = 0;

    constructor() { }

    setPomoState(state: number) {
        this.currentPomoState = state;
    }
}
