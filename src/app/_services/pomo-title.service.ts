import { Injectable } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

// Services
import { TodoOrderService } from '@app/_services/todo-order.service';

@Injectable({
    providedIn: 'root'
})
export class PomoTitleService {

    consoleTextColorService = 'color: salmon;';

    listOfUsedTodos: Object[] = [];

    currentPomoState = 0;
    pomoTitle = 'Some kind of title';
    pomoTitleTodosPart = '';

    constructor(private _todoOrderService: TodoOrderService) { }

    setPomoState(state: number) {
        this.currentPomoState = state;
    }

    updatePomoTitleWithTodo(todo: ToDo) {
        console.log('%cPomoTitleService - todo: ', this.consoleTextColorService, todo);

        this.pomoTitleTodosPart = this.parseTodosTitle(todo);

        if (this.pomoTitleTodosPart) {
            // this.pomoTitle = this.pomoTitleTodosPart + this.pomoTitle;
        }
    }

    parseTodosTitle(todo: ToDo) {
        let tmpPomoTitleWithTodos = '';

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
            const orderList = this._todoOrderService.getOrder();

            console.log('%cPomoTitleService - inner_id: ', this.consoleTextColorService, todo.inner_id);
            orderList.filter(item => {

                const isPresentInnerId = item === todo.inner_id;

                console.log('%cPomoTitleService - isPresentInnerId: ', this.consoleTextColorService, isPresentInnerId);
                return item !== todo.inner_id;
            });

            console.log('%cPomoTitleService - orderList: ', this.consoleTextColorService, orderList);
        }

        if (todoTitleState === 1) {
            this.listOfUsedTodos.splice(todoTitleIndex, 1);
            // this.processTodoTitle(todo.title, false);
        }

        // if todoTitleState = 2 -> do nothing in the service

        return tmpPomoTitleWithTodos;
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
            // Selected todo should be added to title according to his position in the 'todo-list'
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
