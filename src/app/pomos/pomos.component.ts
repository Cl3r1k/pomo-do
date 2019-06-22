import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';

@Component({
    selector: 'app-pomos',
    templateUrl: './pomos.component.html',
    styleUrls: ['./pomos.component.scss']
})
export class PomosComponent implements OnInit {

    @Input() pomoStatePomos: number;
    @Input() currentTodoPomos: ToDo;

    @Output() statePomosComponentEmitter: EventEmitter<number> = new EventEmitter();
    @Output() currentTodoSelectedPomosComponentEmitter: EventEmitter<ToDo> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onStatePomoChange(state: number) {
        this.statePomosComponentEmitter.emit(state);
    }

    onCurrentTodoSelectedChange(todo: ToDo) {
        this.currentTodoSelectedPomosComponentEmitter.emit(todo);
    }

}
