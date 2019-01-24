import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-active-task',
    templateUrl: './active-task.component.html',
    styleUrls: ['./active-task.component.scss']
})
export class ActiveTaskComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    @Input() todo: ToDo;
    @Input() currentActiveTaskName: string;

    @Output() toggleCompleteActiveTaskComponentEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log('%cin ActiveTaskComponent todo: ', this.consoleTextColorComponent, this.todo);
    }

    toggleComplete(todo: ToDo) {
        this.toggleCompleteActiveTaskComponentEmitter.emit(todo);
    }

}
