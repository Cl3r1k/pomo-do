import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Models
import { ToDo } from '@app/_models/to-do';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-active-task',
    templateUrl: './active-task.component.html',
    styleUrls: ['./active-task.component.scss']
})
export class ActiveTaskComponent implements OnInit {

    @Input() todo: ToDo;
    @Input() currentActiveTaskName: string;

    @Output() toggleCompleteActiveTaskComponentEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
        console.log('%cin ActiveTaskComponent todo: ', CONSOLE_TEXT_COLOR_COMPONENT, this.todo);
    }

    toggleComplete(todo: ToDo) {
        this.toggleCompleteActiveTaskComponentEmitter.emit(todo);
    }

}
