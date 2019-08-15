import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { ToDo } from '@app/_models/to-do';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

    @Input() todosAllAmount: number;
    @Input() todosAllCompleted: boolean;
    @Input() hashTagToFilter: string;

    @Output() addTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() toggleAllTodosComponentEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleAllHoverStateTodosComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    @Input() todos: ToDo[];
    @Input() todosToView = [[]];
    @Input() isEmptyTodoList = true;

    @Output() toggleCompleteTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() updateTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() moreTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() pinTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() removeTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() moveTodosComponentEmitter: EventEmitter<ToDo[]> = new EventEmitter();
    @Output() clearTodosComponentEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() clearHoverStateTodosComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onAddTodo(todo: ToDo) {
        this.addTodosComponentEmitter.emit(todo);    // Emit the 'addTodo' event to 'AppMainComponent'
    }

    onToggleAllTodos(toggleState: boolean) {
        this.toggleAllTodosComponentEmitter.emit(toggleState);    // Emit the 'toggleAll' event to 'AppMainComponent'
    }

    onSetToggleAllHoverState(toggleAllHoverState: boolean) {
        this.toggleAllHoverStateTodosComponentEmitter.emit(toggleAllHoverState); // Emit the 'toggleAllHoverState' evt to 'AppMainComponent'
    }

    onToggleTodoComplete(todo: ToDo) {
        this.toggleCompleteTodosComponentEmitter.emit(todo);    // Emit the 'toggle' event to 'AppMainComponent'
    }

    onUpdateTodo(todo: ToDo) {
        this.updateTodosComponentEmitter.emit(todo);    // Emit the 'update' event to 'AppMainComponent'
    }

    onMoreTodo(todo: ToDo) {
        this.moreTodosComponentEmitter.emit(todo);    // Emit the 'more' event to 'AppMainComponent'
    }

    onPinTodo(todo: ToDo) {
        this.pinTodosComponentEmitter.emit(todo);    // Emit the 'pin' event to 'AppMainComponent'
    }

    onRemoveTodo(todo: ToDo) {
        this.removeTodosComponentEmitter.emit(todo);    // Emit the 'remove' event to 'AppMainComponent'
    }

    onMoveTodo(todosUpdated: ToDo[]) {
        this.moveTodosComponentEmitter.emit(todosUpdated);    // Emit the 'move' event to 'AppMainComponent'
    }

    onClearCompleted(clearState: boolean) {
        this.clearTodosComponentEmitter.emit(clearState);    // Emit the 'clear' event to 'AppMainComponent'
    }

    onClearHoverSetState(clearCompletetHoverState: boolean) {
        this.clearHoverStateTodosComponentEmitter.emit(clearCompletetHoverState);    // Emit the 'clearHover' event to 'AppMainComponent'
    }

}
