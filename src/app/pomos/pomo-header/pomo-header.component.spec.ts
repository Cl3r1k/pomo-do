import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Components
import { PomoHeaderComponent } from './pomo-header.component';

// Services
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

// Modules
import { MatDialogModule, MatDialog } from '@angular/material';

// Mocks
import { MatDialogMock } from '@app/_testing/mat-dialog-mock';

describe('Component: PomoHeaderComponent', () => {
    let component: PomoHeaderComponent;
    let fixture: ComponentFixture<PomoHeaderComponent>;
    let dialog: MatDialogMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomoHeaderComponent],
            imports: [FormsModule, MatDialogModule],
            providers: [
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                },
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PomoHeaderComponent);
        component = fixture.componentInstance;

        dialog = TestBed.get(MatDialog);

        fixture.detectChanges();
    });

    it(`Should create an instance of 'PomoHeaderComponent'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it(`Should have initial values`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.pomoLengthSeconds).toEqual(10);
    });



    ////
    //// -----------------
    ////



    describe(`#cancelPomoClick()`, () => {
        it(`should call MatDialog and should be open - and after MatDialog should be closed`, () => {
            // Arrange

            // Act
            spyOn(dialog, 'open').and.callThrough();
            component.cancelPomoClick();

            // Assert
            expect(dialog.open).toHaveBeenCalled();
        });
    });
});
