import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Routes
import { Router } from '@angular/router';

// Services
import { SessionStorageService } from '@app/_services/session-storage.service';
import { AuthService } from '@app/_services/auth.service';

// Components
import { DialogAccountComponent } from '@app/dialogs/dialog-account/dialog-account.component';
import { DialogSettingsComponent } from '@app/dialogs/dialog-settings/dialog-settings.component';

// Modules
import { MatDialog } from '@angular/material';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-header',
    templateUrl: './app-header.component.html',
    styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

    readonly BUILD_VERSION = environmentProd.version;

    @Input() showSubmenuState: boolean;
    @Output() subMenuStateAppTitleEmitter: EventEmitter<boolean> = new EventEmitter();

    syncMessage = 'Syncing...';
    syncState = 2;
    offlineState = false;
    profileName = '';

    constructor(private _sessionStorageService: SessionStorageService,
        private _authService: AuthService,
        private _router: Router,
        private _dialog: MatDialog) { }

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

        if (this.syncState === 2) {
            this.syncMessage = 'Syncing...';
        } else {
            this.syncMessage = '';
        }

        console.log('%csyncState: %d, offlineState: ', CONSOLE_TEXT_COLOR_COMPONENT, this.syncState, this.offlineState);
    }

    toggleSubmenuState() {
        this.showSubmenuState = !this.showSubmenuState;
        this.subMenuStateAppTitleEmitter.emit(this.showSubmenuState);
    }

    doSignOut() {
        this._authService.doSignOut();
        this._router.navigate(['/sign-in']);
    }

    showAccountDialog() {
        // Call dialog 'Account'

        // TODO: Change fake_data to real_data
        const dataForDialog = {
            Name: 'User',
            Email: 'some_kind_of@mail.com'
        };

        const dialogRef = this._dialog.open(DialogAccountComponent, {
            width: '500px',
            data: dataForDialog
        });

        dialogRef.afterClosed().subscribe(result => {
            // User clicked 'x' or clicked outside of the dialog
        });
    }

    showSettingsDialog() {
        // Call dialog 'Settings'

        // TODO: Change fake_data to real_data
        const dataForDialog = {
            Name: 'User',
            Email: 'some_kind_of@mail.com'
        };

        const dialogRef = this._dialog.open(DialogSettingsComponent, {
            width: '500px',
            data: dataForDialog
        });

        dialogRef.afterClosed().subscribe(result => {
            // User clicked 'x' or clicked outside of the dialog
        });
    }

}
