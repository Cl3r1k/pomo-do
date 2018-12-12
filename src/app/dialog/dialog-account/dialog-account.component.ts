import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Utils
import { MatchValidation } from '@app/_common/match-validation';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'app-dialog-account',
    templateUrl: './dialog-account.component.html',
    styleUrls: ['./dialog-account.component.scss']
})
export class DialogAccountComponent implements OnInit {

    consoleTextColorComponent = 'color: cadetblue;';

    public formPassword: FormGroup;

    isFirstTab = true;
    editNameState = false;
    editEmailState = false;
    formValid = false;
    showPasswordsInputErrors = false;
    passwordInputError = false;
    passwordNewInputError = false;
    passwordNewConfirmInputError = false;
    hidePassword = true;
    hidePasswordConfirm = true;

    constructor(
        public dialogRef: MatDialogRef<DialogAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _formBuilder: FormBuilder
    ) {
        this.formPassword = _formBuilder.group({
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            passwordCurrent: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            passwordConfirm: ['', Validators.required]
        }, {
                validator: MatchValidation.validate('password', 'passwordConfirm')
            });
    }

    ngOnInit() {
        console.log('%cdata: ', this.consoleTextColorComponent, this.data);

        this.formPassword.controls['name'].setValue(this.data['Name']);
        this.formPassword.controls['email'].setValue(this.data['Email']);

        // console.log('%cthis.formPassword.controls: ', this.consoleTextColorComponent, this.formPassword.controls);
    }

    changeCurrentTabAccount(state: boolean) {
        this.isFirstTab = state;
        this.formValid = !this.formValid;
    }

    changeName(state) {
        this.editNameState = state;

        // TODO: Perform request to backEnd and change 'name'
    }

    changeEmail(state) {
        this.editEmailState = state;

        // TODO: Perform request to backEnd and change 'email'
    }

    changePassword() {

        // console.log('%cformPassword.errors: ', this.consoleTextColorComponent, this.formPassword.errors);
        // console.log('%cfrmPwd.ctls.pwdCnfrm.err: ', this.consoleTextColorComponent, this.formPassword.controls.passwordConfirm.errors);

        if (this.formPassword.invalid) {
            this.showPasswordsInputErrors = true;
            return;
        }

        console.log('%cPassword changed!', this.consoleTextColorComponent);
    }

}
