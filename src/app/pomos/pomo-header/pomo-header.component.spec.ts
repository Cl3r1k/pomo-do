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
import { PomoTitleService } from '@app/_services/pomo-title.service';

// Modules
import { MatDialogModule, MatDialog } from '@angular/material';

// Mocks
import { MatDialogMock } from '@app/_testing/mat-dialog-mock';

describe('Component: PomoHeaderComponent', () => {
    let component: PomoHeaderComponent;
    let fixture: ComponentFixture<PomoHeaderComponent>;
    let dialog: MatDialogMock;
    let pomoStateService: PomoStateService;
    let pomoTitleService: PomoTitleService;
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
        pomoTitleService = TestBed.get(PomoTitleService);
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

    describe(`#startTimer()`, () => {
        it(`Should start timer and decrease 'counter'`, () => {
            // Arrange

            // Act
            component.startTimer();

            // Assert
            expect(component.counter).toBeLessThanOrEqual(component.pomoLengthSeconds);
        });
    });

    describe(`#resetCounter()`, () => {
        it(`Should set 'counter' to 'restLengthSeconds' and 'currentState' to 'pomo' if 'restState' = false`, () => {
            // Arrange

            // Act
            component.resetCounter(false);

            // Assert
            expect(component.counter).toEqual(component.pomoLengthSeconds);
            expect(component.currentState).toEqual('pomo');
        });

        it(`Should set 'counter' to 'pomoLengthSeconds' and 'currentState' to 'rest' if 'restState' = true`, () => {
            // Arrange

            // Act
            component.resetCounter(true);

            // Assert
            expect(component.counter).toEqual(component.restLengthSeconds);
            expect(component.currentState).toEqual('rest');
        });

        it(`Should set initital values for 'counterView' and document.title`, () => {
            // Arrange

            // Act
            component.resetCounter(false);

            // Assert
            // tslint:disable-next-line:max-line-length
            expect(component.counterView).toEqual(('00' + Math.floor(component.counter / 60)).slice(-2) + ':' + ('00' + (component.counter % 60)).slice(-2));
            expect(document.title).toEqual('Pomodo');
        });
    });

    describe(`#cancelPomoClick()`, () => {
        it(`Should call MatDialog and should be open - and after MatDialog should be closed`, () => {
            // Arrange

            // Act
            spyOn(dialog, 'open').and.callThrough();
            component.cancelPomoClick();

            // Assert
            expect(dialog.open).toHaveBeenCalled();
        });

        it(`Should call 'cancelPomo()' if 'currentState' not equal 'pomo'`, () => {
            // Arrange
            component.currentState = 'rest';

            // Act
            spyOn(component, 'cancelPomo');
            component.cancelPomoClick();

            // Assert
            expect(component.cancelPomo).toHaveBeenCalled();
        });
    });

    describe(`#cancelPomo()`, () => {
        it(`Should call 'emitPomoState()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'emitPomoState');
            component.cancelPomo();

            // Assert
            expect(component.emitPomoState).toHaveBeenCalled();
        });

        it(`Should call 'resetCounter()'`, () => {
            // Arrange

            // Act
            spyOn(component, 'resetCounter');
            component.cancelPomo();

            // Assert
            expect(component.resetCounter).toHaveBeenCalled();
        });

        it(`Should call 'pomoStateService.interruptPomo()'`, () => {
            // Arrange

            // Act
            spyOn(pomoStateService, 'interruptPomo');
            component.cancelPomo();

            // Assert
            expect(pomoStateService.interruptPomo).toHaveBeenCalled();
        });
    });

    describe(`#savePomo()`, () => {
        it(`Shouldn't change 'currentState' if 'event' is 'Escape'`, () => {
            // Arrange
            component.currentState = 'pomo';
            const keyDownEnterEvent = new KeyboardEvent('keydown', {
                'key': 'Escape'
            });

            // Act
            component.savePomo(keyDownEnterEvent);

            // Assert
            expect(component.currentState).toEqual('pomo');
        });

        it(`Shouldn't change 'currentState' if 'event' is 'Enter' and 'pomoTitleService.pomoTitle' is empty`, () => {
            // Arrange
            pomoTitleService.pomoTitle = '';
            component.currentState = 'pomo';
            const keyDownEnterEvent = new KeyboardEvent('keydown', {
                'key': 'Enter'
            });

            // Act
            component.savePomo(keyDownEnterEvent);

            // Assert
            expect(component.currentState).toEqual('pomo');
        });

        it(`Should change 'currentState' to 'rest' if 'event' is 'Enter' and 'pomoTitleService.pomoTitle' is not empty`, () => {
            // Arrange
            pomoTitleService.pomoTitle = 'tst';
            component.currentState = 'pomo';
            const keyDownEnterEvent = new KeyboardEvent('keydown', {
                'key': 'Enter'
            });

            // Act
            component.savePomo(keyDownEnterEvent);

            // Assert
            expect(component.currentState).toEqual('rest');
        });

        it(`Should call 'pomoStateService.saveCompletedPomo' if 'event' is 'Enter' and 'pomoTitleService.pomoTitle' is not empty`, () => {
            // Arrange
            pomoTitleService.pomoTitle = 'tst';
            component.currentState = 'pomo';
            const keyDownEnterEvent = new KeyboardEvent('keydown', {
                'key': 'Enter'
            });

            // Act
            spyOn(pomoStateService, 'saveCompletedPomo');
            component.savePomo(keyDownEnterEvent);

            // Assert
            expect(pomoStateService.saveCompletedPomo).toHaveBeenCalled();
        });

        it(`Should clear 'pomoTitleService.pomoTitle' if 'event' is 'Enter' and 'pomoTitleService.pomoTitle' is not empty`, () => {
            // Arrange
            pomoTitleService.pomoTitle = 'tst';
            component.currentState = 'pomo';
            const keyDownEnterEvent = new KeyboardEvent('keydown', {
                'key': 'Enter'
            });

            // Act
            component.savePomo(keyDownEnterEvent);

            // Assert
            expect(pomoTitleService.pomoTitle).toEqual('');
        });
    });

    describe(`#setSavePomoFocus()`, () => {
        it(`Should set 'savePomoFocusState' to 'false' with 'false' argument`, () => {
            // Arrange

            // Act
            component.setSavePomoFocus(false);

            // Assert
            expect(component.savePomoFocusState).toEqual(false);
        });

        it(`Should set 'savePomoFocusState' to 'true' with 'true' argument`, () => {
            // Arrange

            // Act
            component.setSavePomoFocus(true);

            // Assert
            expect(component.savePomoFocusState).toEqual(true);
        });
    });

    describe(`#emitPomoState()`, () => {
        it(`Should emit 'statePomoHeaderComponentEmitter'`, () => {
            // Arrange
            let statePomo = 0;

            // Act
            component.statePomoHeaderComponentEmitter.subscribe((value) => statePomo = value);    // Subscribe to update event
            component.emitPomoState(1, false);

            // Assert
            expect(statePomo).toEqual(1);
        });

        it(`Should call 'pomoTitleService.setPomoState()'`, () => {
            // Arrange

            // Act
            spyOn(pomoTitleService, 'setPomoState');
            component.emitPomoState(1, false);

            // Assert
            expect(pomoTitleService.setPomoState).toHaveBeenCalled();
        });
    });

    describe(`#pomoTitleManualChange()`, () => {
        it(`Should call 'pomoTitleService.lockUsedTodos()'`, () => {
            // Arrange

            // Act
            spyOn(pomoTitleService, 'lockUsedTodos');
            component.pomoTitleManualChange(null);

            // Assert
            expect(pomoTitleService.lockUsedTodos).toHaveBeenCalled();
        });
    });
});
