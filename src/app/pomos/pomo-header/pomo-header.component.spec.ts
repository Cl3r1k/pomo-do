import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
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
import { PomoTitleMockService } from '@app/_services/pomo-title-mock.service';
import { PomoStateMockService } from '@app/_services/pomo-state-mock.service';

describe('Component: PomoHeaderComponent', () => {
    let component: PomoHeaderComponent;
    let fixture: ComponentFixture<PomoHeaderComponent>;
    let dialog: MatDialogMock;
    let pomoStateService: PomoStateService;
    let pomoTitleService: PomoTitleService;
    let expectedTodo: ToDo;
    let buttonStartEl;
    let spanProgressLabelEl;
    let svgIconCrossEl;
    let txtAreaPomoSaveEl;
    let svgIconKeyboardReturn;
    let svgIconCrossEl2;

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
                },
                {
                    provide: PomoStateService,
                    useClass: PomoStateMockService
                },
                {
                    provide: PomoTitleService,
                    useClass: PomoTitleMockService
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
        expectedTodo = new ToDo({ id: 1, title: 'Test title in PomoHeaderComponent', complete: false });
        expectedTodo.inner_id = '123456789';
        component.currentTodoPomoHeader = expectedTodo;                    // Lets count that we have todo with 'complete' = false

        // Set 'pomo-start-container' active
        component.pomoStatePomoHeader = 0;
        fixture.detectChanges();

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

        it(`Should call 'pomoTitleService.resetTitleStateAfterSave' if 'event -> Enter' and 'pomoTitleService.pomoTitle' not empty`, () => {
            // Arrange
            pomoTitleService.pomoTitle = 'tst';
            component.currentState = 'pomo';
            const keyDownEnterEvent = new KeyboardEvent('keydown', {
                'key': 'Enter'
            });

            // Act
            spyOn(pomoTitleService, 'resetTitleStateAfterSave');
            component.savePomo(keyDownEnterEvent);

            // Assert
            expect(pomoTitleService.resetTitleStateAfterSave).toHaveBeenCalled();
        });
    });

    describe(`#emitPomoState()`, () => {
        it(`Should emit 'statePomoHeaderComponentEmitter' event`, () => {
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

    describe(`#view tests:`, () => {

        describe(`button.button-start-pomo:`, () => {
            it(`Clicking on 'button.button-start-pomo' should call method 'startPomo()'`, () => {
                // Arrange
                buttonStartEl = fixture.debugElement.query(By.css('button.button-start-pomo'));           // Find start-button element

                // Act
                spyOn(component, 'startPomo');
                if (buttonStartEl instanceof HTMLElement) {
                    buttonStartEl.click();
                } else {
                    buttonStartEl.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.startPomo).toHaveBeenCalled();
                });
            });
        });

        describe(`span.cssProgress-label:`, () => {
            it(`'span.cssProgress-label' should have value equal to 'counterView'`, () => {
                // Arrange
                component.pomoStatePomoHeader = 1;
                component.resetCounter(false);    // Change 'counterView' state
                fixture.detectChanges();
                spanProgressLabelEl = fixture.debugElement.query(By.css('span.cssProgress-label')); // Find span.Progress-label element

                // Act

                // Assert
                expect(spanProgressLabelEl.nativeElement.innerText).toEqual(component.counterView);
            });
        });

        describe(`svg.icon-cross:`, () => {
            it(`Clicking on 'svg.icon-cross' should call 'cancelPomoClick()'`, () => {
                // Arrange
                component.pomoStatePomoHeader = 1;
                fixture.detectChanges();
                svgIconCrossEl = fixture.debugElement.query(By.css('svg.icon-cross')); // Find svg.icon-cross element

                // Act
                spyOn(component, 'cancelPomoClick');
                if (svgIconCrossEl instanceof HTMLElement) {
                    svgIconCrossEl.click();
                } else {
                    svgIconCrossEl.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.cancelPomoClick).toHaveBeenCalled();
                });
            });
        });

        describe(`textarea.pomo-save-field:`, () => {
            it(`Press 'Enter' on 'textarea.pomo-save-field' should call 'savePomo()'`, () => {
                // Arrange
                component.pomoStatePomoHeader = 2;
                fixture.detectChanges();
                txtAreaPomoSaveEl = fixture.debugElement.nativeElement.querySelector('textarea.pomo-save-field'); // Find textarea element

                const keyDownEnterEvent = new KeyboardEvent('keydown', {
                    'key': 'Enter'
                });
                console.log(`%c txtAreaPomoSaveEl`, 'color: red;', txtAreaPomoSaveEl);

                // Act
                spyOn(component, 'savePomo');
                txtAreaPomoSaveEl.dispatchEvent(keyDownEnterEvent);
                fixture.detectChanges();

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.savePomo).toHaveBeenCalled();
                });
            });
        });

        describe(`svg.icon-keyboard_return:`, () => {
            it(`Clicking on 'svg.icon-keyboard_return' should call 'savePomo()'`, () => {
                // Arrange
                component.pomoStatePomoHeader = 2;
                fixture.detectChanges();
                svgIconKeyboardReturn = fixture.debugElement.query(By.css('svg.icon-keyboard_return')); // Find svg.icon-keyboard_return el

                // Act
                spyOn(component, 'savePomo');
                if (svgIconKeyboardReturn instanceof HTMLElement) {
                    svgIconKeyboardReturn.click();
                } else {
                    svgIconKeyboardReturn.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.savePomo).toHaveBeenCalled();
                });
            });
        });

        describe(`svg.icon-cross:`, () => {
            it(`Clicking on 'svg.icon-cross' should call 'cancelPomoClick()'`, () => {
                // Arrange
                component.pomoStatePomoHeader = 2;
                fixture.detectChanges();
                svgIconCrossEl2 = fixture.debugElement.query(By.css('svg.icon-cross')); // Find svg.icon-cross el

                // Act
                spyOn(component, 'cancelPomoClick');
                if (svgIconCrossEl2 instanceof HTMLElement) {
                    svgIconCrossEl2.click();
                } else {
                    svgIconCrossEl2.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.cancelPomoClick).toHaveBeenCalled();
                });
            });
        });

    });
});
