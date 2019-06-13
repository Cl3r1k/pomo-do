import { Component, OnInit } from '@angular/core';

// Services
import { PomoStateService } from '@app/_services/pomo-state.service';

@Component({
    selector: 'app-pomo-list',
    templateUrl: './pomo-list.component.html',
    styleUrls: ['./pomo-list.component.scss']
})
export class PomoListComponent implements OnInit {

    isSyncing = false;

    constructor(private _pomoStateService: PomoStateService) { }

    ngOnInit() {
    }

}
