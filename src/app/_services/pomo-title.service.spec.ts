import { TestBed } from '@angular/core/testing';

// Services
import { PomoTitleService } from './pomo-title.service';
import { TodoOrderService } from '@app/_services/todo-order.service';
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

// Models
import { ToDo } from '@app/_models/to-do';

describe('Service: PomoTitleService', () => {

    let service: PomoTitleService;
    let expectedTodo1: ToDo;
    let expectedTodo2: ToDo;
    let expectedTodo3: ToDo;

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
        expectedTodo1 = new ToDo({ id: 1, title: 'Test title in PomoTitleService', complete: false });
        expectedTodo1.inner_id = 'asdf123';
        expectedTodo2 = new ToDo({ id: 2, title: 'Test title in PomoTitleService 2 !!!', complete: false });
        expectedTodo2.inner_id = 'qwer456';
        expectedTodo3 = new ToDo({ id: 3, title: 'Test title in PomoTitleService 3 #tagName', complete: false });
        expectedTodo3.inner_id = 'zxcv789';

        service.listOfUsedTodos = [
            { innerId: expectedTodo1.inner_id, todoTitle: expectedTodo1.title, todoTitleState: 1 },
            { innerId: expectedTodo2.inner_id, todoTitle: expectedTodo2.title, todoTitleState: 1 },
            { innerId: expectedTodo3.inner_id, todoTitle: expectedTodo3.title, todoTitleState: 1 }
        ];
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
            service.updatePomoTitleWithTodo(expectedTodo1);

            // Assert
            expect(service.updatePomoTitleWithTodo).toHaveBeenCalled();
        });

        it(`should exclude 'expectedTodo1.title' in 'pomoTitle' as far 'todoTitleState' === 1 `, () => {
            // Arrange
            service.pomoTitleManualPart = 'Test pomo';

            // Act
            service.updatePomoTitleWithTodo(expectedTodo1);

            // Assert
            expect(service.pomoTitle).toEqual('Test title in PomoTitleService 2 + Test title in PomoTitleService 3 #tagName + Test pomo');
        });
    });

    describe(`#parseTodosTitle()`, () => {
        it(`should return '' as far 'TodoOrderService' mocked`, () => {
            // Arrange

            // Act
            const resultTitle = service.parseTodosTitle(expectedTodo1);

            // Assert
            expect(resultTitle).toEqual('');
        });
    });

    describe(`#processTodoTitle()`, () => {
        it(`should return '' as far 'TodoOrderService' mocked`, () => {
            // Arrange

            // Act
            const resultTitle = service.parseTodosTitle(expectedTodo1);

            // Assert
            expect(resultTitle).toEqual('');
        });
    });
});
