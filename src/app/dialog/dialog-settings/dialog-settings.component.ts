import { Component, OnInit, Inject } from '@angular/core';

// Imports
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-settings',
    templateUrl: './dialog-settings.component.html',
    styleUrls: ['./dialog-settings.component.scss']
})
export class DialogSettingsComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    currentTab = 0;
    playSoundWorkState = false;
    playSoundWorkSaveState = false;
    playSoundWorkSaveText = 'Saving';
    playSoundAlarmState = false;
    playSoundAlarmSaveState = false;
    playSoundAlarmSaveText = 'Saving';
    notificationState = false;
    notificationSaveState = false;
    notificationSaveText = 'Saving';
    timeTypeState = false;
    timeTypeSaveState = false;
    timeTypeSaveText = 'Saving';

    constructor(
        public dialogRef: MatDialogRef<DialogSettingsComponent>,
        @Inject(MAT_DIALOG_DATA) public data
    ) { }

    ngOnInit() {
        console.log('%cdata: ', this.consoleTextColorComponent, this.data);
    }

    changeCurrentTab(tabIndex: number) {
        this.currentTab = tabIndex;
    }

    savePlaySoundWorkState(state: boolean) {
        this.playSoundWorkSaveState = true;
        setTimeout(() => {
            this.playSoundWorkSaveText = 'Saved';
            setTimeout(() => {
                this.playSoundWorkSaveState = false;
                this.playSoundWorkSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

    savePlaySoundAlarmState(state: boolean) {
        this.playSoundAlarmSaveState = true;
        setTimeout(() => {
            this.playSoundAlarmSaveText = 'Saved';
            setTimeout(() => {
                this.playSoundAlarmSaveState = false;
                this.playSoundAlarmSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

    saveNotificationState(state: boolean) {
        this.notificationSaveState = true;
        setTimeout(() => {
            this.notificationSaveText = 'Saved';
            setTimeout(() => {
                this.notificationSaveState = false;
                this.notificationSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

    saveTimeTypeState(state: boolean) {
        this.timeTypeSaveState = true;
        setTimeout(() => {
            this.timeTypeSaveText = 'Saved';
            setTimeout(() => {
                this.timeTypeSaveState = false;
                this.timeTypeSaveText = 'Saving';
            }, 2000);
        }, 3000);
    }

}
