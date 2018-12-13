import { TestBed, async, inject } from '@angular/core/testing';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatchValidation } from '@app/_common/match-validation';

describe(`Class: MatchValidation`, () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [FormBuilder]
        });
    }));

    it(`Should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(new MatchValidation()).toBeTruthy();
    }));

    describe(`#validate():`, () => {
        it(`Test from with 'passwordConfirm' field shoud have 'mustMatch' = true `, inject([FormBuilder], (formBuilder: FormBuilder) => {
            // Arrange
            const form = formBuilder.group({
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required]
            }, {
                    validator: MatchValidation.validate('password', 'passwordConfirm')
                });

            // Act
            form.controls['password'].setValue('pass');
            form.controls['passwordConfirm'].setValue('passWORD');

            // Assert
            // console.log(result);
            expect(form.controls.passwordConfirm.errors.mustMatch).toEqual(true);
        }));

        it(`Test from with 'passwordConfirm' field shoud have null errors`, inject([FormBuilder], (formBuilder: FormBuilder) => {
            // Arrange
            const form = formBuilder.group({
                password: ['', Validators.required],
                passwordConfirm: ['', Validators.required]
            }, {
                    validator: MatchValidation.validate('password', 'passwordConfirm')
                });

            // Act
            form.controls['password'].setValue('pass');
            form.controls['passwordConfirm'].setValue('pass');

            // Assert
            // console.log(result);
            expect(form.controls.passwordConfirm.errors).toEqual(null);
        }));
    });
});
