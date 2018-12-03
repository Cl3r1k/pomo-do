import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-account',
    templateUrl: './dialog-account.component.html',
    styleUrls: ['./dialog-account.component.scss']
})
export class DialogAccountComponent implements OnInit {

    public formPassword: FormGroup;

    isFirstTab = true;
    editNameState = false;
    editEmailState = false;
    currentPassword = '';
    newPassword = '';
    newPasswordConfirm = '';
    formValid = false;

    constructor(
        public dialogRef: MatDialogRef<DialogAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _formBuilder: FormBuilder
    ) {
        this.formPassword = _formBuilder.group({
            password: ['', Validators.required],
            passwordNew: ['', Validators.required],
            passwordNewConfirm: ['', Validators.required]
        });
    }

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

    // TODO: Use reactive forms for passwords fields

}
