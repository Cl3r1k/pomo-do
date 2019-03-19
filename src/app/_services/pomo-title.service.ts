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
                this.listOfUsedTodos.push({ innerId: todo.inner_id, todoTitleState: 1 });
            } else {
                const usedTodoIndex = orderListFiltered.indexOf(todo.inner_id);

                if (usedTodoIndex !== -1) {
                    this.listOfUsedTodos.splice(usedTodoIndex, 0, { innerId: todo.inner_id, todoTitleState: 1 });
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
        const i = 0;
        let splittedStringOfTodos = '';

        this.listOfUsedTodos.map(item => {
            if (i !== this.listOfUsedTodos.length - 1) {
                splittedStringOfTodos += item['innerId'] + ' + ';
            } else {
                splittedStringOfTodos += item['innerId'];
            }
        });

        console.log('%cPomoTitleService - splittedStringOfTodos: ', this.consoleTextColorService, splittedStringOfTodos);

        return '';
        // console.log('%cPomoTitleService - listOfUsedTodos: ', this.consoleTextColorService, this.listOfUsedTodos);
        // if (state) {
        //     if (this.pomoTitle) {
        //         this.pomoTitle = todoTitle + ' + ' + this.pomoTitle;
        //     } else {
        //         this.pomoTitle = todoTitle;
        //     }
        // } else {
        //     // Test variant when single todo selected
        //     // Test variant when multiple todos selected, and unselected in defferent sequence
        //     // Test -> todo1 sel -> todo2 sel -> unsel todo2 - case (in the end shouldn't be +)
        //     // Selected todo should be added to title according to his position in the 'todo-list'
        //     const substrIndex = this.pomoTitle.indexOf(todoTitle);
        //     console.log('%cPomoTitleService - substrIndex: ', this.consoleTextColorService, substrIndex);
        //     if (substrIndex !== -1) {

        //         if (substrIndex === 0) {
        //             this.pomoTitle = this.pomoTitle.substr(substrIndex + todoTitle.length + 3);
        //         }

        //         if (substrIndex > 0) {
        //             const newStringPart1 = this.pomoTitle.substr(0, substrIndex);
        //             const newStringPart2 = this.pomoTitle.substr(substrIndex + todoTitle.length + 3);
        //             this.pomoTitle = newStringPart1 + newStringPart2;
        //         }
        //     }
        // }
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
