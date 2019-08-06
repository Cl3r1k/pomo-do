import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-cancel',
    templateUrl: './dialog-cancel.component.html',
    styleUrls: ['./dialog-cancel.component.scss']
})
export class DialogCancelComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<DialogCancelComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
    }

    onConfirm() {
        this.dialogRef.close('Confirm');
    }

}
