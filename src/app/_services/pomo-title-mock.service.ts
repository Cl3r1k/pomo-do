import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Injectable()
export class PomoTitleMockService {

    pomoTitle = '';
    listOfUsedTodos: Object[] = [];

    constructor() { }

    public setPomoState(state: number, isInitialStart: boolean, todo: ToDo = null) { }

    public updatePomoTitleWithTodo(todo: ToDo) { }

    public parseTodosTitle(todo: ToDo) { }

    public processTodoTitle(): string {
        return '';
    }

    public parseTitlePriority(todoTitle: string) { }

    public lockUsedTodos() { }

}
