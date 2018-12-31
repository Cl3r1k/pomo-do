import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-todo-current',
    templateUrl: './todo-current.component.html',
    styleUrls: ['./todo-current.component.scss']
})
export class TodoCurrentComponent implements OnInit {

    @Input() currentTodo: string;
    @Input() currentTodoId: number;

    constructor() { }

    ngOnInit() {
    }

    toggleComplete(currentTodoId: number) {
        //
    }

}
