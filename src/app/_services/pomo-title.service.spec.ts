import { TestBed } from '@angular/core/testing';

// Services
import { PomoTitleService } from './pomo-title.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

// Models
import { ToDo } from '@app/_models/to-do';

describe('Service: PomoTitleService', () => {

    let service: PomoTitleService;
    let expectedTodo: ToDo;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                }
            ]
        });

        service = TestBed.get(PomoTitleService);
        expectedTodo = new ToDo({ id: 1, title: 'Test title in PomoTitleService', complete: false });
    });

    it('Should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    it('Should have initial values', () => {
        // Arrange

        // Act

        // Assert
        expect(service.currentPomoState).toEqual(0);
        expect(service.pomoTitle).toEqual('');
        expect(service.pomoTitleTodosPart).toEqual('');
        expect(service.pomoTitleManualPart).toEqual('');
        expect(service.isInitialState).toEqual(true);
    });

    describe(`#setPomoState()`, () => {
        it(`should set 'currentPomoState'`, () => {
            // Arrange
            const newPomoState = 1;

            // Act
            service.setPomoState(newPomoState, false);

            // Assert
            expect(service.currentPomoState).toEqual(newPomoState);
        });

        it(`should call 'updatePomoTitleWithTodo()' if argument2 is true`, () => {
            // Arrange
            const newPomoState = 1;

            // Act
            spyOn(service, 'updatePomoTitleWithTodo');
            service.setPomoState(newPomoState, true);

            // Assert
            expect(service.currentPomoState).toEqual(newPomoState);
            expect(service.updatePomoTitleWithTodo).toHaveBeenCalled();
        });
    });

    describe(`#updatePomoTitleWithTodo()`, () => {
        it(`should call 'parseTodosTitle()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'updatePomoTitleWithTodo');
            service.updatePomoTitleWithTodo(expectedTodo);

            // Assert
            expect(service.updatePomoTitleWithTodo).toHaveBeenCalled();
        });

        it(`should set 'pomoTitle' to 'pomoTitleManualPart' (in test todo does not affect on it)`, () => {
            // Arrange
            service.pomoTitleManualPart = 'Test pomo';

            // Act
            service.updatePomoTitleWithTodo(expectedTodo);

            // Assert
            expect(service.pomoTitle).toEqual('Test pomo');
        });
    });
});
