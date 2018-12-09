import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// Utils
// import { MatchValidation } from '@app/_common/match-validation';
import { MustMatch } from '@app/_common/match-validation';

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

    constructor(
        public dialogRef: MatDialogRef<DialogAccountComponent>,
        @Inject(MAT_DIALOG_DATA) public data,
        private _formBuilder: FormBuilder
    ) {
        this.formPassword = _formBuilder.group({
            passwordCurrent: ['', Validators.required],
            password: ['', Validators.required],
            passwordConfirm: ['', Validators.required]
        }, {
                // validator: MatchValidation.validate('password', 'passwordConfirm')
                validator: MustMatch('password', 'passwordConfirm')
            });
    }

    ngOnInit() {
        console.log('data: ', this.data);
    }

    changeCurrentTabAccount(state: boolean) {
        this.isFirstTab = state;
        this.formValid = !this.formValid;
    }

    setEditNameState(state) {
        this.editNameState = state;
    }

    setEditEmailState(state) {
        this.editEmailState = state;
    }

    changePassword() {

        console.log('%cformPassword.errors: ', this.consoleTextColorComponent, this.formPassword.errors);

        console.log('%cfrmPwd.ctls.passdConfirm.err: ', this.consoleTextColorComponent, this.formPassword.controls.passwordConfirm.errors);

        if (this.formPassword.invalid) {
            this.showPasswordsInputErrors = true;
            return;
        }

        console.log('%cPassword changes!', this.consoleTextColorComponent);
    }

    // TODO: Write custom validation
    // getErrorMessage(sender: string) {
    //     let errorMessage = '';

    //     if (sender === 'password') {
    //         errorMessage = this.formPassword.get('password').hasError('required') ? 'You must enter a value' : '';
    //         this.passwordInputError = true;
    //     }

    //     if (sender === 'passwordNew') {
    //         errorMessage = this.formPassword.get('passwordNew').hasError('required') ? 'You must enter a value' : '';
    //         this.passwordNewInputError = true;
    //     }

    //     if (sender === 'passwordNewConfirm') {
    //         errorMessage = this.formPassword.get('passwordNewConfirm').hasError('required') ? 'You must enter a value' : '';
    //         this.passwordNewConfirmInputError = true;
    //     }

    //     if (sender === 'passwordNew' || sender === 'passwordNewConfirm') {
    //         if (this.formPassword.get('passwordNew').valid && this.formPassword.get('passwordNewConfirm').valid) {
    //             if (this.formPassword.get('passwordNew').value !== this.formPassword.get('passwordNewConfirm').value) {
    //                 errorMessage = 'Password and confirm not equal';
    //                 this.passwordNewInputError = true;
    //                 this.passwordNewConfirmInputError = true;
    //             }
    //         }
    //     }

    //     if (!this.passwordInputError && !this.passwordNewInputError && !this.passwordNewConfirmInputError) {
    //         console.log('%cformValid is TRUE', this.consoleTextColorComponent);
    //         this.formValid = true;
    //     } else {
    //         this.formValid = false;
    //     }

    //     return errorMessage;
    // }

}
