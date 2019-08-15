import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { ToDo } from '@app/_models/to-do';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-todo-list-header',
    templateUrl: './todo-list-header.component.html',
    styleUrls: ['./todo-list-header.component.scss']
})
export class TodoListHeaderComponent implements OnInit {

    newTodo: ToDo = new ToDo();

    @Input() todosAllAmount: number;
    @Input() todosAllCompleted: boolean;

    @Input() hashTagToFilter: string;

    @Output() addTodoListHeaderEmitter: EventEmitter<ToDo> = new EventEmitter();

    @Output() toggleAllTodoListHeaderEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleAllHoverStateTodoListHeaderEmitter: EventEmitter<boolean> = new EventEmitter();

    newTodoFocusState = false;

    constructor(public router: Router) { }

    ngOnInit() {
        console.log(`%cin 'TodoListHeaderComponent' hashTagToFilter: `, CONSOLE_TEXT_COLOR_COMPONENT, this.hashTagToFilter);
    }

    addTodo() {
        if (this.newTodo.title) {
            this.newTodo.title = this.newTodo.title.trim();
            this.addTodoListHeaderEmitter.emit(this.newTodo);    // Emit the 'addTodo' event to 'TodosComponent'
            this.newTodo = new ToDo();

            // console.log('%c Added new Todo, created_time: ', CONSOLE_TEXT_COLOR_COMPONENT, this.newTodo.created_time);
        }
    }

    toggleAllTodos(toggleState: boolean) {
        this.toggleAllTodoListHeaderEmitter.emit(toggleState);    // Emit the 'toggleAll' event to TodosComponent
    }

    setToggleAllHoverState(toggleAllHoverState: boolean) {
        this.toggleAllHoverStateTodoListHeaderEmitter.emit(toggleAllHoverState); // Emit the 'toggleAllHoverState' event to 'TodosComponent'
    }

    setNewTodoFocus(newTodoFocusState: boolean) {
        this.newTodoFocusState = newTodoFocusState;
    }

    resetFilter() {
        this.router.navigate(['/app']);
    }

}
