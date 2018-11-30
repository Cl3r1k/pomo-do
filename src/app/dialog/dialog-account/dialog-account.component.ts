import { Component, OnInit, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-account',
    templateUrl: './dialog-account.component.html',
    styleUrls: ['./dialog-account.component.scss']
})
export class DialogAccountComponent implements OnInit {

    isFirstTab = true;
    editNameState = false;
    editEmailState = false;

    constructor(public dialogRef: MatDialogRef<DialogAccountComponent>, @Inject(MAT_DIALOG_DATA) public data) { }

    ngOnInit() {
        console.log('data: ', this.data);
    }

    changeCurrentTabAccount(state: boolean) {
        this.isFirstTab = state;
    }

    setEditNameState(state) {
        this.editNameState = state;
    }

    setEditEmailState(state) {
        this.editEmailState = state;
    }

}
