import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Models
import { ToDo } from '@app/_models/to-do';
import { Pomo } from '@app/_models/pomo';

@Component({
    selector: 'app-pomos',
    templateUrl: './pomos.component.html',
    styleUrls: ['./pomos.component.scss']
})
export class PomosComponent implements OnInit {

    @Input() pomoStatePomos: number;
    @Input() currentTodoPomos: ToDo;

    @Output() statePomosComponentEmitter: EventEmitter<number> = new EventEmitter();

    @Output() recentPomosPomosComponentEmitter: EventEmitter<Pomo[]> = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    onStatePomoChange(state: number) {
        this.statePomosComponentEmitter.emit(state);
    }

    onRecentPomosChange(recentPomos: Pomo[]) {
        this.recentPomosPomosComponentEmitter.emit(recentPomos);
    }

}
