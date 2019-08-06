import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { DialogSettingsComponent } from './dialog-settings.component';

// Imports
import { MatFormFieldModule, MatCheckboxModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatDialogRefMock } from '@app/_testing/mat-dialog-mock';

describe('Component: DialogSettingsComponent', () => {
    let component: DialogSettingsComponent;
    let fixture: ComponentFixture<DialogSettingsComponent>;

    // Mock MAT_DIALOG_DATA with the Object
    const dataForDialog = {
        Name: 'UserDebug',
        Email: 'some_kind_of_debug@mail.com'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatCheckboxModule],
            declarations: [DialogSettingsComponent],
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
        fixture = TestBed.createComponent(DialogSettingsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`should create an instance of 'DialogSettingsComponent' (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`should have initial values`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.currentTab).toEqual(0);
        expect(component.playSoundWorkState).toEqual(false);
        expect(component.playSoundWorkSaveState).toEqual(false);
        expect(component.playSoundWorkSaveText).toEqual('Saving');
        expect(component.playSoundAlarmState).toEqual(false);
        expect(component.playSoundAlarmSaveState).toEqual(false);
        expect(component.playSoundAlarmSaveText).toEqual('Saving');
        expect(component.notificationState).toEqual(false);
        expect(component.notificationSaveState).toEqual(false);
        expect(component.notificationSaveText).toEqual('Saving');
        expect(component.timeTypeState).toEqual(false);
        expect(component.timeTypeSaveState).toEqual(false);
        expect(component.timeTypeSaveText).toEqual('Saving');
        expect(component.currentDailyGoal).toEqual(8);
        expect(component.dailyGoalSaveState).toEqual(false);
        expect(component.dailyGoalSaveText).toEqual('Saving');
        expect(component.currentDailyGoal).toEqual(8);
        expect(component.dailyGoalSaveState).toEqual(false);
        expect(component.dailyGoalSaveText).toEqual('Saving');
        expect(component.currentWeeklyGoal).toEqual(40);
        expect(component.weeklyGoalSaveState).toEqual(false);
        expect(component.weeklyGoalSaveText).toEqual('Saving');
        expect(component.currentMonthlyGoal).toEqual(160);
        expect(component.monthlyGoalSaveState).toEqual(false);
        expect(component.monthlyGoalSaveText).toEqual('Saving');
        expect(component.proStatus).toEqual(false);
    });

    it(`form invalid when empty (passwords fields are empty)`, () => {
        // Arrange

        // Act
        component.formGoal.reset();

        // Assert
        expect(component.formGoal.valid).toBeFalsy();
    });

    describe(`#'dailyGoal' field tests: `, () => {
        it(`'dailyGoal' field validity`, () => {
            // Arrange

            // Act
            component.formGoal.reset();
            const dailyGoal = component.formGoal.controls['dailyGoal'];

            // Assert
            expect(dailyGoal.valid).toBeFalsy();
        });

        it(`'dailyGoal' field 'required' validity`, () => {
            // Arrange
            let errors = {};

            // Act
            component.formGoal.reset();
            const dailyGoal = component.formGoal.controls['dailyGoal'];
            errors = dailyGoal.errors || {};

            // Assert
            expect(errors['required']).toBeTruthy();
        });

        it(`'dailyGoal' field with data should be valid and 'required' should be undefined`, () => {
            // Arrange
            let errors = {};

            // Act
            const dailyGoal = component.formGoal.controls['dailyGoal'];
            dailyGoal.setValue(8);
            errors = dailyGoal.errors || {};

            // Assert
            expect(dailyGoal.valid).toBeTruthy();
            expect(errors['required']).toEqual(undefined);
        });
    });

    describe(`#'weeklyGoal' field tests: `, () => {
        it(`'weeklyGoal' field validity`, () => {
            // Arrange

            // Act
            component.formGoal.reset();
            const weeklyGoal = component.formGoal.controls['weeklyGoal'];

            // Assert
            expect(weeklyGoal.valid).toBeFalsy();
        });

        it(`'weeklyGoal' field 'required' validity`, () => {
            // Arrange
            let errors = {};

            // Act
            component.formGoal.reset();
            component.formGoal.controls['weeklyGoal'].enable();
            const weeklyGoal = component.formGoal.controls['weeklyGoal'];
            errors = weeklyGoal.errors || {};

            // Assert
            expect(errors['required']).toBeTruthy();
        });

        it(`'weeklyGoal' field with data should be valid and 'required' should be undefined`, () => {
            // Arrange
            let errors = {};

            // Act
            component.formGoal.controls['weeklyGoal'].enable();
            const weeklyGoal = component.formGoal.controls['weeklyGoal'];
            weeklyGoal.setValue(40);
            errors = weeklyGoal.errors || {};

            // Assert
            expect(weeklyGoal.valid).toBeTruthy();
            expect(errors['required']).toEqual(undefined);
        });
    });

    describe(`#'monthlyGoal' field tests: `, () => {
        it(`'monthlyGoal' field validity`, () => {
            // Arrange

            // Act
            component.formGoal.reset();
            const monthlyGoal = component.formGoal.controls['monthlyGoal'];

            // Assert
            expect(monthlyGoal.valid).toBeFalsy();
        });

        it(`'monthlyGoal' field 'required' validity`, () => {
            // Arrange
            let errors = {};

            // Act
            component.formGoal.reset();
            component.formGoal.controls['monthlyGoal'].enable();
            const monthlyGoal = component.formGoal.controls['monthlyGoal'];
            errors = monthlyGoal.errors || {};

            // Assert
            expect(errors['required']).toBeTruthy();
        });

        it(`'monthlyGoal' field with data should be valid and 'required' should be undefined`, () => {
            // Arrange
            let errors = {};

            // Act
            component.formGoal.controls['monthlyGoal'].enable();
            const monthlyGoal = component.formGoal.controls['monthlyGoal'];
            monthlyGoal.setValue(160);
            errors = monthlyGoal.errors || {};

            // Assert
            expect(monthlyGoal.valid).toBeTruthy();
            expect(errors['required']).toEqual(undefined);
        });
    });

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
    });
});
