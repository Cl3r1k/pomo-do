import { FormGroup } from '@angular/forms';

// Custom validator to check that two fields match
export class MatchValidation {
    static validate(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                // Return if another validator has already found an error or the matchingControl
                return;
            }

            // Set error on matchingControl if validation fails
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }
}
