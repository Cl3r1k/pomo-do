import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Injectable({
    providedIn: 'root'
})
export class PomoTitleService {

    consoleTextColorService = 'color: salmon;';

    currentPomoState = 0;
    pomoTitle = 'Some kind of title';

    constructor() { }

    setPomoState(state: number) {
        this.currentPomoState = state;
    }

    updatePomoTitleWithTodo(todo: ToDo) {
        console.log('%cPomoTitleService - todo: ', this.consoleTextColorService, todo);
    }
}
