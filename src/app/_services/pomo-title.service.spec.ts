import { TestBed, async } from '@angular/core/testing';

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
        it(`Should set 'currentPomoState'`, () => {
            // Arrange
            const newPomoState = 1;

            // Act
            service.setPomoState(newPomoState, false);

            // Assert
            expect(service.currentPomoState).toEqual(newPomoState);
        });

        it(`Should call 'updatePomoTitleWithTodo()' if argument2 is true`, () => {
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
        it(`Should call 'parseTodosTitle()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'updatePomoTitleWithTodo');
            service.updatePomoTitleWithTodo(expectedTodo1);

            // Assert
            expect(service.updatePomoTitleWithTodo).toHaveBeenCalled();
        });

        it(`Should exclude 'expectedTodo1.title' in 'pomoTitle' as far 'todoTitleState' === 1 `, () => {
            // Arrange
            service.pomoTitleManualPart = 'Test pomo';

            // Act
            service.updatePomoTitleWithTodo(expectedTodo1);

            // Assert
            expect(service.pomoTitle).toEqual('Test title in PomoTitleService 2 + Test title in PomoTitleService 3 #tagName + Test pomo');
        });
    });

    describe(`#parseTodosTitle()`, () => {
        it(`Should return string with excluded 'expectedTodo1.title'`, () => {
            // Arrange

            // Act
            const resultTitle = service.parseTodosTitle(expectedTodo1);

            // Assert
            expect(resultTitle).toEqual('Test title in PomoTitleService 2 + Test title in PomoTitleService 3 #tagName');
        });
    });

    describe(`#processTodoTitle()`, () => {
        it(`Should return combined title of from 'listOfUsedTodos'`, () => {
            // Arrange

            // Act
            const resultTitle = service.processTodoTitle();

            // Assert
            // tslint:disable-next-line:max-line-length
            expect(resultTitle).toEqual('Test title in PomoTitleService + Test title in PomoTitleService 2 + Test title in PomoTitleService 3 #tagName');
        });

        it(`Should call 'parseTitlePriority()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'parseTitlePriority');
            const resultTitle = service.processTodoTitle();

            // Assert
            expect(service.parseTitlePriority).toHaveBeenCalled();
        });
    });

    describe(`#parseTitlePriority()`, () => {
        it(`Should return initial string without changes (async)`, async(() => {
            // Arrange

            // Act
            const result = service.parseTitlePriority('Add more todos!');

            // Assert
            expect(result).toEqual('Add more todos!');
        }));

        it(`Should return parsed string with changes (async)`, async(() => {
            // Arrange

            // Act
            const result = service.parseTitlePriority('Add more todos !');

            // Assert
            expect(result).toEqual('Add more todos');
        }));

        it(`Should return parsed string with changes - the last of '!' should be exluded (async)`, async(() => {
            // Arrange

            // Act
            const result = service.parseTitlePriority('Add more todos ! !!');

            // Assert
            expect(result).toEqual('Add more todos !');
        }));

        it(`Should return parsed string(contains ! in middle) with changes (async)`, async(() => {
            // Arrange

            // Act
            const result = service.parseTitlePriority('Add more ! todos ! !!!');

            // Assert
            expect(result).toEqual('Add more ! todos !');
        }));

        it(`Should return parsed string(contains many !) with changes (async)`, async(() => {
            // Arrange
            const todo: ToDo = new ToDo({ title: 'Add more todos ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!' });

            // Act
            const result = service.parseTitlePriority('Add more todos ! !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');

            // Assert
            expect(result).toEqual('Add more todos !');
        }));
    });

    describe(`#lockUsedTodos()`, () => {
        it(`Should set for all 'todos' in 'listOfUsedTodos' 'todoTitleState' === 2 with arg true`, () => {
            // Arrange

            // Act
            service.lockUsedTodos(true);

            // Assert
            expect(service.listOfUsedTodos[0]['todoTitleState']).toEqual(2);
            expect(service.listOfUsedTodos[1]['todoTitleState']).toEqual(2);
            expect(service.listOfUsedTodos[2]['todoTitleState']).toEqual(2);
        });

        it(`Should set for all 'todos' in 'listOfUsedTodos' 'todoTitleState' === 1 with arg false`, () => {
            // Arrange

            // Act
            service.lockUsedTodos(false);

            // Assert
            expect(service.listOfUsedTodos[0]['todoTitleState']).toEqual(1);
            expect(service.listOfUsedTodos[1]['todoTitleState']).toEqual(1);
            expect(service.listOfUsedTodos[2]['todoTitleState']).toEqual(1);
        });

        it(`Should set 'pomoTitleManualPart' to 'pomoTitle' and clear 'pomoTitleTodosPart'`, () => {
            // Arrange
            service.pomoTitleManualPart = 'Manual part';
            service.pomoTitle = 'pomo Title';
            service.pomoTitleTodosPart = 'Todos part';

            // Act
            service.lockUsedTodos(true);

            // Assert
            expect(service.pomoTitleManualPart).toEqual('pomo Title');
            expect(service.pomoTitleTodosPart).toEqual('');
        });
    });

    describe(`#resetTitleStateAfterSave()`, () => {
        it(`Should clear 'pomoTitleManualPart'`, () => {
            // Arrange
            service.pomoTitleManualPart = 'Test manual title';

            // Act
            service.resetTitleStateAfterSave();

            // Assert
            expect(service.pomoTitleManualPart).toEqual('');
        });

        it(`Should call 'lockUsedTodos()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'lockUsedTodos');
            service.resetTitleStateAfterSave();

            // Assert
            expect(service.lockUsedTodos).toHaveBeenCalled();
        });

        it(`Should call 'generatePomoTitleManual()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'generatePomoTitleManual');
            service.resetTitleStateAfterSave();

            // Assert
            expect(service.generatePomoTitleManual).toHaveBeenCalled();
        });
    });

    describe(`#generatePomoTitleManual()`, () => {
        it(`Should combine title of from 'listOfUsedTodos' in 'pomoTitleTodosPart'`, () => {
            // Arrange

            // Act
            service.generatePomoTitleManual();

            // Assert
            // tslint:disable-next-line:max-line-length
            expect(service.pomoTitleTodosPart).toEqual('Test title in PomoTitleService + Test title in PomoTitleService 2 !!! + Test title in PomoTitleService 3 #tagName');
        });

        it(`Should set 'pomoTitle' equal to 'pomoTitleTodosPart'`, () => {
            // Arrange
            service.pomoTitle = 'Tst pomo title';

            // Act
            service.generatePomoTitleManual();

            // Assert
            expect(service.pomoTitle).toEqual(service.pomoTitleTodosPart);
        });
    });
});
