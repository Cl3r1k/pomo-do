import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Injectable({
    providedIn: 'root'
})
export class PomoTitleService {

    consoleTextColorService = 'color: salmon;';

    listOfUsedTodos: Object[] = [];

    currentPomoState = 0;
    pomoTitle = 'Some kind of title';

    constructor() { }

    setPomoState(state: number) {
        this.currentPomoState = state;
    }

    updatePomoTitleWithTodo(todo: ToDo) {
        console.log('%cPomoTitleService - todo: ', this.consoleTextColorService, todo);

        let todoTitleState = 0;
        let todoTitleIndex = 0;
        this.listOfUsedTodos.map(item => {
            if (item['innerId'] === todo.inner_id) {
                todoTitleState = item['todoTitleState'];
            }

            if (!todoTitleState) {
                todoTitleIndex++;
            }
        });

        if (todoTitleState === 0) {
            this.listOfUsedTodos.push({ innerId: todo.inner_id, todoTitleState: 1 });
            this.processTodoTitle(todo.title, true);
        }

        if (todoTitleState === 1) {
            this.listOfUsedTodos.splice(todoTitleIndex, 1);
            this.processTodoTitle(todo.title, false);
        }

        // if todoTitleState = 2 -> do nothing in the service
    }

    processTodoTitle(todoTitle: string, state: boolean) {
        console.log('%cPomoTitleService - listOfUsedTodos: ', this.consoleTextColorService, this.listOfUsedTodos);
        if (state) {
            if (this.pomoTitle) {
                this.pomoTitle = todoTitle + ' + ' + this.pomoTitle;
            } else {
                this.pomoTitle = todoTitle;
            }
        } else {
            // Test variant when single todo selected
            // Test variant when multiple todos selected, and unselected in defferent sequence
            // Test -> todo1 sel -> todo2 sel -> unsel todo2 - case (in the end shouldn't be +)
            const substrIndex = this.pomoTitle.indexOf(todoTitle);
            console.log('%cPomoTitleService - substrIndex: ', this.consoleTextColorService, substrIndex);
            if (substrIndex !== -1) {

                if (substrIndex === 0) {
                    this.pomoTitle = this.pomoTitle.substr(substrIndex + todoTitle.length + 3);
                }

                if (substrIndex > 0) {
                    const newStringPart1 = this.pomoTitle.substr(0, substrIndex);
                    const newStringPart2 = this.pomoTitle.substr(substrIndex + todoTitle.length + 3);
                    this.pomoTitle = newStringPart1 + newStringPart2;
                }
            }
        }
    }

    // Change todoTitleState for every object if 'pomoTitle' was changed in component manually
    lockUsedTodos() {
        this.listOfUsedTodos.map(item => {
            if (item['todoTitleState'] !== 2) {
                item['todoTitleState'] = 2;
            }
        });
    }
}
