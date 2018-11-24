import { Component, OnInit } from '@angular/core';

import { environment } from '@env/environment.prod';

// Services
import { SessionStorageService } from '@app/_services/session-storage.service';

@Component({
    selector: 'app-todo-title',
    templateUrl: './todo-title.component.html',
    styleUrls: ['./todo-title.component.scss']
})
export class TodoTitleComponent implements OnInit {

    BUILD_VERSION = environment.version;

    consoleTextColorComponent = 'color: cadetblue;';

    syncMessage = 'Syncing...';
    syncState = 0;
    offlineState = true;
    showSubmenu = false;
    profileName = '';

    constructor(private _sessionStorageService: SessionStorageService) { }

    ngOnInit() {
        this.profileName = this._sessionStorageService.session_object.account.display_name;
    }

    changeSyncState() {
        // console.log('changeSyncState() called');
        if (this.syncState === 0) {
            if (this.offlineState) {
                this.offlineState = false;
            } else {
                this.syncState++;
            }
        } else {
            if (this.syncState === 3) {
                this.syncState = 0;
                this.offlineState = true;
            } else {
                this.syncState++;
            }
        }

        // TODO: Do not forget to change this part and compare 'syncState' with 2, and btw change the init value of the variable
        if (this.syncState === 0) {
            this.syncMessage = 'Syncing...';
        } else {
            this.syncMessage = '';
        }

        console.log('%csyncState: %d, offlineState: ', this.consoleTextColorComponent, this.syncState, this.offlineState);
    }

    toggleSubmenuState() {
        this.showSubmenu = !this.showSubmenu;
    }

}
