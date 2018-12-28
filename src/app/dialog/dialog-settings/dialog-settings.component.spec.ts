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
});
