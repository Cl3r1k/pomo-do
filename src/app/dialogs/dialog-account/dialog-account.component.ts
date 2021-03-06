import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Environments
import { environment as environmentProd } from '@env/environment.prod';

// Utils
import { MatchValidation } from '@app/_common/match-validation';

// Imports
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// Constants
const CONSOLE_TEXT_COLOR_COMPONENT = environmentProd.consoleTextColorComponent;

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
    hidePassword = true;           // Variable to show/hide password on form
    hidePasswordConfirm = true;    // Variable to show/hide password on form

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
        console.log('%cdata: ', CONSOLE_TEXT_COLOR_COMPONENT, this.data);

        this.formPassword.controls['name'].setValue(this.data['Name']);
        this.formPassword.controls['email'].setValue(this.data['Email']);

        // console.log('%cthis.formPassword.controls: ', CONSOLE_TEXT_COLOR_COMPONENT, this.formPassword.controls);
    }

    changeCurrentTabAccount(state: boolean) {
        this.isFirstTab = state;
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

        // console.log('%cformPassword.errors: ', CONSOLE_TEXT_COLOR_COMPONENT, this.formPassword.errors);
        // console.log('%cfrmPwd.ctls.pwdCnfrm.err: ', CONSOLE_TEXT_COLOR_COMPONENT, this.formPassword.controls.passwordConfirm.errors);

        if (this.formPassword.invalid) {
            return;
        }

        console.log('%cPassword changed!', CONSOLE_TEXT_COLOR_COMPONENT);
    }

}
