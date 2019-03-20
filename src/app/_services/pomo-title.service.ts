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
    pomoTitle = '';
    pomoTitleTodosPart = '';
    pomoTitleManualPart = 'Some kind of title';

    constructor(private _todoOrderService: TodoOrderService) { }

    setPomoState(state: number) {
        this.currentPomoState = state;
    }

    updatePomoTitleWithTodo(todo: ToDo) {
        console.log('%cPomoTitleService - todo: ', this.consoleTextColorService, todo);

        this.pomoTitleTodosPart = this.parseTodosTitle(todo);

        if (this.pomoTitleTodosPart) {
            if (this.pomoTitleManualPart) {
                this.pomoTitle = this.pomoTitleTodosPart + ' + ' + this.pomoTitleManualPart;
            } else {
                this.pomoTitle = this.pomoTitleTodosPart;
            }
        } else {
            if (this.pomoTitleManualPart) {
                this.pomoTitle = this.pomoTitleManualPart;
            } else {
                this.pomoTitle = '';
            }
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
            const orderList = this._todoOrderService.getOrder();

            console.log('%cPomoTitleService - inner_id: ', this.consoleTextColorService, todo.inner_id);
            const orderListFiltered = orderList.filter(item => {

                let isPresentInnerId = false;

                isPresentInnerId = item === todo.inner_id;

                if (!isPresentInnerId) {
                    this.listOfUsedTodos.map(usedTodo => {
                        if (usedTodo['innerId'] === item) {
                            isPresentInnerId = true;
                        }
                    });
                }

                return isPresentInnerId;
            });

            console.log('%cPomoTitleService - orderListFiltered: ', this.consoleTextColorService, orderListFiltered);

            if (orderListFiltered.length === 1) {
                this.listOfUsedTodos.push({ innerId: todo.inner_id, todoTitle: todo.title, todoTitleState: 1 });
            } else {
                const usedTodoIndex = orderListFiltered.indexOf(todo.inner_id);

                if (usedTodoIndex !== -1) {
                    this.listOfUsedTodos.splice(usedTodoIndex, 0, { innerId: todo.inner_id, todoTitle: todo.title, todoTitleState: 1 });
                }
            }

            console.log('%cPomoTitleService - listOfUsedTodos: ', this.consoleTextColorService, this.listOfUsedTodos);
        }

        if (todoTitleState === 1) {
            this.listOfUsedTodos.splice(todoTitleIndex, 1);

            console.log('%cPomoTitleService - listOfUsedTodos: ', this.consoleTextColorService, this.listOfUsedTodos);
        }

        // if todoTitleState = 2 -> do nothing in the service

        tmpPomoTitleWithTodos = this.processTodoTitle();

        return tmpPomoTitleWithTodos;
    }

    processTodoTitle(): string {
        let i = 0;
        let splittedStringOfTodos = '';

        this.listOfUsedTodos.map(item => {
            if (i !== this.listOfUsedTodos.length - 1) {
                splittedStringOfTodos += item['todoTitle'] + ' + ';
            } else {
                splittedStringOfTodos += item['todoTitle'];
            }
            i++;
        });

        // console.log('%cPomoTitleService - splittedStringOfTodos: ', this.consoleTextColorService, splittedStringOfTodos);

        return splittedStringOfTodos;
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
