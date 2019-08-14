import { Component, OnInit, Inject } from '@angular/core';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

@Component({
    selector: 'app-dialog-more',
    templateUrl: './dialog-more.component.html',
    styleUrls: ['./dialog-more.component.scss']
})
export class DialogMoreComponent implements OnInit {

    dataFromDialog: Object;

    constructor(public dialogRef: MatDialogRef<DialogMoreComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
    }

    onConfirmSave() {
        console.log('%creturn data: ', CONSOLE_TEXT_COLOR_COMPONENT, this.data);
        console.log('%c remind_time: ', CONSOLE_TEXT_COLOR_COMPONENT, this.data['data']['remind_time']);

        this.dataFromDialog = {
            dialogResult: 'ConfirmSave',
            pomoCost: this.data['data']['pomoCost'],
            estimatedPomos: this.data['data']['estimatedPomos'],
            remind: this.data['data']['remind'],
            remindTime: this.data['data']['remind_time'],
            note: this.data['data']['note']
        };

        this.dialogRef.close(this.dataFromDialog);
    }

    onConfirmDelete() {

        this.dataFromDialog = {
            dialogResult: 'ConfirmDelete'
        };

        this.dialogRef.close(this.dataFromDialog);
    }

}
