import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { PomoHeaderComponent } from './pomo-header.component';

// Services
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';
import { PomoStateService } from '@app/_services/pomo-state.service';

// Modules
import { MatDialogModule, MatDialog } from '@angular/material';

// Mocks
import { MatDialogMock } from '@app/_testing/mat-dialog-mock';

describe('Component: PomoHeaderComponent', () => {
    let component: PomoHeaderComponent;
    let fixture: ComponentFixture<PomoHeaderComponent>;
    let dialog: MatDialogMock;
    let pomoStateService: PomoStateService;
    let expectedTodo: ToDo;

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

        pomoStateService = TestBed.get(PomoStateService);
        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemViewComponent', complete: false });
        expectedTodo.inner_id = '123456789';
        component.currentTodoPomoHeader = expectedTodo;                    // Lets count that we have todo with 'complete' = false

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
        expect(component.pomoLengthSeconds).toEqual(60);
        expect(component.restLengthSeconds).toEqual(60);
        // expect(component.counter).toEqual(component.pomoLengthSeconds);
        expect(component.counterView).toEqual('');
        expect(component.currentState).toEqual('pomo');
        expect(component.progressBarPercent).toEqual(0);
        expect(component.updatedTextHeight).toEqual(false);
        expect(component.savePomoFocusState).toEqual(false);
    });

    it(`Should set 'afterViewCheckedCount' after 'ngAfterViewChecked()'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component.afterViewCheckedCount).toEqual(1);    // Check with 1 instead 0
    });

    describe(`#startPomo()`, () => {
        it(`Should call 'emitPomoState()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'emitPomoState');
            component.startPomo();

            // Assert
            expect(component.emitPomoState).toHaveBeenCalled();
        });

        it(`Should call 'resetCounter()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'resetCounter');
            component.startPomo();

            // Assert
            expect(component.resetCounter).toHaveBeenCalled();
        });

        it(`Should call 'pomoStateService.initPomoState()'`, () => {
            // Arrange

            // Act
            spyOn(pomoStateService, 'initPomoState');
            component.startPomo();

            // Assert
            expect(pomoStateService.initPomoState).toHaveBeenCalled();
        });

        it(`Should call 'startTimer()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'startTimer');
            component.startPomo();

            // Assert
            expect(component.startTimer).toHaveBeenCalled();
        });
    });

    describe(`#startRest()`, () => {
        it(`Should call 'emitPomoState()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'emitPomoState');
            component.startPomo();

            // Assert
            expect(component.emitPomoState).toHaveBeenCalled();
        });

        it(`Should call 'resetCounter()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'resetCounter');
            component.startPomo();

            // Assert
            expect(component.resetCounter).toHaveBeenCalled();
        });

        it(`Should call 'startTimer()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'startTimer');
            component.startPomo();

            // Assert
            expect(component.startTimer).toHaveBeenCalled();
        });
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
