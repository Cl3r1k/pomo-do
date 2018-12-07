import { FormGroup } from '@angular/forms';

export class PasswordValidation {
    static validate(passwordFormGroup: FormGroup) {
        const password = passwordFormGroup.controls.password.value;
        const passwordConfirm = passwordFormGroup.controls.passwordConfirm.value;

        if (passwordConfirm.length <= 0) {
            return null;
        }

        if (passwordConfirm !== password) {
            return {
                doesMatchPassword: true
            };
        }

        return null;
    }
}
