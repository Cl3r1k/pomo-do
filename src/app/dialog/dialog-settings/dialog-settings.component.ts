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

}
