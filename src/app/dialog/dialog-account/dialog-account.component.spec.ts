import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { DialogAccountComponent } from './dialog-account.component';

// Imports
import { MatDialogRef, MAT_DIALOG_DATA, MatFormFieldModule, MatIconModule } from '@angular/material';
import { MatDialogRefMock } from '@app/_testing/mat-dialog-mock';

describe('Component: DialogAccountComponent', () => {
    let component: DialogAccountComponent;
    let fixture: ComponentFixture<DialogAccountComponent>;

    // Mock MAT_DIALOG_DATA with the Object
    const dataForDialog = {
        Name: 'UserDebug',
        Email: 'some_kind_of_debug@mail.com'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogAccountComponent],
            imports: [ReactiveFormsModule, MatFormFieldModule, MatIconModule],
            providers: [
                { provide: MatDialogRef, useClass: MatDialogRefMock },
                {
                    provide: MAT_DIALOG_DATA, useValue: {
                        data: {
                            data: dataForDialog
                        }
                    }
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogAccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`should create an instance of 'DialogAccountComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`should have initial values`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.isFirstTab).toEqual(true);
        expect(component.editNameState).toEqual(false);
        expect(component.editEmailState).toEqual(false);
        expect(component.hidePassword).toEqual(true);
        expect(component.hidePasswordConfirm).toEqual(true);
    });

    it(`form invalid when empty (passwords fields are empty)`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.formPassword.valid).toBeFalsy();
    });

    describe(`#'name' field tests: `, () => {
        it(`'name' field validity`, () => {
            // Arrange

            // Act
            const name = component.formPassword.controls['name'];

            // Assert
            expect(name.valid).toBeFalsy();
        });

        it(`'name' field 'required' validity`, () => {
            // Arrange
            let errors = {};

            // Act
            const name = component.formPassword.controls['name'];
            errors = name.errors || {};

            // Assert
            expect(errors['required']).toBeTruthy();
        });

        it(`'name' field with data should be valid and 'required' should be undefined`, () => {
            // Arrange
            let errors = {};

            // Act
            const name = component.formPassword.controls['name'];
            name.setValue('testName');
            errors = name.errors || {};

            // Assert
            expect(name.valid).toBeTruthy();
            expect(errors['required']).toEqual(undefined);
        });
    });

    describe(`#'email' field tests: `, () => {
        it(`'email' field validity`, () => {
            // Arrange

            // Act
            const email = component.formPassword.controls['email'];

            // Assert
            expect(email.valid).toBeFalsy();
        });

        it(`'email' field 'required' and 'email' validity`, () => {
            // Arrange
            let errors = {};

            // Act
            const email = component.formPassword.controls['email'];
            errors = email.errors || {};

            // Assert
            expect(errors['required']).toBeTruthy();
            // expect(errors['email']).toBeTruthy();
        });

        it(`'email' field with some data - 'required' should be undefined, but with 'email' error`, () => {
            // Arrange
            let errors = {};

            // Act
            const email = component.formPassword.controls['email'];
            email.setValue('testEmail');
            errors = email.errors || {};

            // Assert
            expect(errors['required']).toEqual(undefined);
            expect(errors['email']).toBeTruthy();
        });

        it(`'email' field with valid email data  should be valid - 'required' and 'email' should be undefined`, () => {
            // Arrange
            let errors = {};

            // Act
            const email = component.formPassword.controls['email'];
            email.setValue('testEmail@email.com');
            errors = email.errors || {};

            // Assert
            expect(email.valid).toBeTruthy();
            expect(errors['required']).toEqual(undefined);
            expect(errors['email']).toEqual(undefined);
        });
    });


    // it(`'password' field validity`, () => {
    //     // Arrange

    //     // Act
    //     const password = component.frm.controls['password'];

    //     // Assert
    //     expect(password.valid).toBeFalsy();
    // });

    // it(`'password' field 'required' validity`, () => {
    //     // Arrange
    //     let errors = {};

    //     // Act
    //     const password = component.frm.controls['password'];
    //     errors = password.errors || {};

    //     // Assert
    //     expect(errors['required']).toBeTruthy();
    // });

    // it(`'password' field with data should be valid and 'required' should be undefined`, () => {
    //     // Arrange
    //     let errors = {};

    //     // Act
    //     const password = component.frm.controls['password'];
    //     password.setValue('testPassword');
    //     errors = password.errors || {};

    //     // Assert
    //     expect(password.valid).toBeTruthy();
    //     expect(errors['required']).toEqual(undefined);
    // });

    describe(`#view tests`, () => {
        // TODO: Improve this test for closing dialog
        // look here https://github.com/angular/material2/blob/master/src/lib/dialog/dialog.spec.ts#L178
        // here https://github.com/angular/material2/blob/d1128febe6d23f1a1f20446692bc2a8358e8b8cf/src/lib/dialog/dialog.spec.ts#L116-L116
        // and here https://medium.com/@aleixsuau/testing-angular-components-with-material-dialog-mddialog-1ae658b4e4b3
        // it(`clicking on button.dialog__close-btn should call method 'dialogRef.close()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component.dialogRef, 'close');
        //     if (dialogCloseBtnEl instanceof HTMLElement) {
        //         dialogCloseBtnEl.click();
        //     } else {
        //         dialogCloseBtnEl.triggerEventHandler('click', { button: 0 });
        //     }

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.dialogRef.close).toHaveBeenCalled();
        //     });
        // });

        // it(`clicking on button.dialog__confirm-delete-btn should call method 'onConfirmDelete()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component, 'onConfirmDelete');
        //     if (dialogConfirmDeleteBtnEl instanceof HTMLElement) {
        //         dialogConfirmDeleteBtnEl.click();
        //     } else {
        //         dialogConfirmDeleteBtnEl.triggerEventHandler('click', { button: 0 });
        //     }

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.onConfirmDelete).toHaveBeenCalled();
        //     });
        // });

        // it(`clicking on button.dialog__confirm-save-btn should call method 'onConfirmSave()' (async)`, async () => {
        //     // Arrange

        //     // Act
        //     spyOn(component, 'onConfirmSave');
        //     if (dialogConfirmSaveBtnEl instanceof HTMLElement) {
        //         dialogConfirmSaveBtnEl.click();
        //     } else {
        //         dialogConfirmSaveBtnEl.triggerEventHandler('click', { button: 0 });
        //     }

        //     // Assert
        //     fixture.whenStable().then(() => {
        //         expect(component.onConfirmSave).toHaveBeenCalled();
        //     });
        // });
    });
});
