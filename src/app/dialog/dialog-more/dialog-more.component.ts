import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-more',
    templateUrl: './dialog-more.component.html',
    styleUrls: ['./dialog-more.component.scss']
})
export class DialogMoreComponent implements OnInit {

    private consoleTextColorComponent = 'color: cadetblue;';

    dataFromDialog: Object;

    constructor(public dialogRef: MatDialogRef<DialogMoreComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
    }

    onConfirmSave() {
        console.log('%creturn data: ', this.consoleTextColorComponent, this.data);
        console.log('%c remind_time: ', this.consoleTextColorComponent, this.data['data']['remind_time']);

        this.dataFromDialog = {
            dialogResult: 'ConfirmSave',
            todoCost: this.data['data']['todoCost'],
            estimatedTodos: this.data['data']['estimatedTodos'],
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
