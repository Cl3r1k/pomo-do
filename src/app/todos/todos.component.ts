import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() todosAllAmount: number;
    @Input() todosAllCompleted: boolean;
    @Input() hashTagToFilter: string;

    @Output() addTodosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();
    @Output() toggleAllTodosComponentEmitter: EventEmitter<boolean> = new EventEmitter();
    @Output() toggleAllHoverStateTodosComponentEmitter: EventEmitter<boolean> = new EventEmitter();

    @Input() todos: ToDo[];
    @Input() todosToView = [[]];

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
        this.addTodosComponentEmitter.emit(todo);    // Emit the addTodo event to 'MainComponent'
    }

    toggleAllTodos(toggleState: boolean) {
        this.toggleAllTodosComponentEmitter.emit(toggleState);    // Emit the toggleAll event to 'MainComponent'
    }

    setToggleAllHoverState(toggleAllHoverState: boolean) {
        this.toggleAllHoverStateTodosComponentEmitter.emit(toggleAllHoverState);    // Emit the toggleAllHoverState event to 'MainComponent'
    }

}
