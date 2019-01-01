import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-todo-current',
    templateUrl: './todo-current.component.html',
    styleUrls: ['./todo-current.component.scss']
})
export class TodoCurrentComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() todo: ToDo;

    @Output() toggleTodoCurrentComponentEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log('%cin TodoCurrentComponent todo: ', this.consoleTextColorComponent, this.todo);
    }

    toggleComplete(todo: ToDo) {
        //
    }

}
