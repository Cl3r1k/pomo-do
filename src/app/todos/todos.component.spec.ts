import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { TodosComponent } from '@app/todos/todos.component';
import { TodoListHeaderComponent } from '@app/todo-list-header/todo-list-header.component';
import { TodoListComponent } from '@app/todo-list/todo-list.component';
import { TodoListItemComponent } from '@app/todo-list/todo-list-item/todo-list-item.component';
import { TodoListItemViewComponent } from '@app/todo-list/todo-list-item/todo-list-item-view/todo-list-item-view.component';
import { TodoListItemEditComponent } from '@app/todo-list/todo-list-item/todo-list-item-edit/todo-list-item-edit.component';

// Directives
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Pipes
import { SafePipe } from '@app/_pipes/safe.pipe';
import { FilterTagPipe } from '@app/_pipes/filter-tag.pipe';
import { ParseTagPipe } from '@app/_pipes/parse-tag.pipe';

// Services
import { TagService } from '@app/_services/tag.service';
import { TagMockService } from '@app/_services/tag-mock.service';

// Modules
import { DndModule } from '@beyerleinf/ngx-dnd';

describe(`Component: TodosComponent`, () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let expectedTodo: ToDo;
    let expectedTodo2: ToDo;
    let expectedTodo3: ToDo;
    let expectedTodos: ToDo[];

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodosComponent,
                TodoListHeaderComponent,
                TodoListComponent,
                TodoListItemComponent,
                TodoListItemViewComponent,
                TodoListItemEditComponent,
                TooltipDirective,
                SafePipe,
                FilterTagPipe,
                ParseTagPipe
            ],
            imports: [
                FormsModule,
                RouterTestingModule,
                DndModule
            ],
            providers: [
                {
                    provide: TagService,
                    useClass: TagMockService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;

        expectedTodo = new ToDo({ id: 1, title: 'Test 1', complete: false });
        expectedTodo2 = new ToDo({ id: 2, title: 'Test 2', complete: true });
        expectedTodo3 = new ToDo({ id: 3, title: 'Test 3', complete: false });

        expectedTodo.inner_id = '1b14d11e-6c0d-44f0-a3e0-5804f217c6fc';
        expectedTodo2.inner_id = '812545db-2c17-4e19-a2c2-3165fc0dec36';
        expectedTodo3.inner_id = 'fae2f374-f5aa-46f9-90ec-c6b9d95fa368';
        expectedTodos = [expectedTodo, expectedTodo2, expectedTodo3];

        fixture.detectChanges();
    });

    it(`Should create the app (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it(`should emit 'add' event (async)`, async(() => {
        // Arrange
        let resultTodo: ToDo;

        // Act
        component.addTodosComponentEmitter.subscribe(todo => { resultTodo = todo; });    // Subscribe to 'add' event
        component.onAddTodo(expectedTodo);

        // Assert
        expect(resultTodo).toEqual(expectedTodo);
    }));

    it(`should emit 'toggleAll' event (async)`, async(() => {
        // Arrange
        let resultToggleAllState: boolean;

        // Act
        component.toggleAllTodosComponentEmitter.subscribe(state => { resultToggleAllState = state; });    // Subscribe to 'toggleAll' event
        component.onToggleAllTodos(true);

        // Assert
        expect(resultToggleAllState).toEqual(true);
    }));

    it(`should emit 'toggleAllHoverState' event (async)`, async(() => {
        // Arrange
        let resultToggleAllHoverState: boolean;

        // Act
        component.toggleAllHoverStateTodosComponentEmitter.subscribe(state => {
            resultToggleAllHoverState = state;     // Subscribe to 'toggleAllHoverState' event
        });
        component.onSetToggleAllHoverState(true);

        // Assert
        expect(resultToggleAllHoverState).toEqual(true);
    }));

    it(`should emit 'toggle' event (async)`, async(() => {
        // Arrange
        let resultTodo: ToDo;

        // Act
        component.toggleCompleteTodosComponentEmitter.subscribe(todo => { resultTodo = todo; });    // Subscribe to 'toggle' event
        component.onToggleTodoComplete(expectedTodo);

        // Assert
        expect(resultTodo).toEqual(expectedTodo);
    }));

    it(`should emit 'update' event (async)`, async(() => {
        // Arrange
        let resultTodo: ToDo;

        // Act
        component.updateTodosComponentEmitter.subscribe(todo => { resultTodo = todo; });    // Subscribe to 'update' event
        component.onUpdateTodo(expectedTodo);

        // Assert
        expect(resultTodo).toEqual(expectedTodo);
    }));

    it(`should emit 'more' event (async)`, async(() => {
        // Arrange
        let resultTodo: ToDo;

        // Act
        component.moreTodosComponentEmitter.subscribe(todo => { resultTodo = todo; });    // Subscribe to 'more' event
        component.onMoreTodo(expectedTodo);

        // Assert
        expect(resultTodo).toEqual(expectedTodo);
    }));

    it(`should emit 'pin' event (async)`, async(() => {
        // Arrange
        let resultTodo: ToDo;

        // Act
        component.pinTodosComponentEmitter.subscribe(todo => { resultTodo = todo; });    // Subscribe to 'pin' event
        component.onPinTodo(expectedTodo);

        // Assert
        expect(resultTodo).toEqual(expectedTodo);
    }));

    it(`should emit 'remove' event (async)`, async(() => {
        // Arrange
        let resultTodo: ToDo;

        // Act
        component.removeTodosComponentEmitter.subscribe(todo => { resultTodo = todo; });    // Subscribe to 'remove' event
        component.onRemoveTodo(expectedTodo);

        // Assert
        expect(resultTodo).toEqual(expectedTodo);
    }));

    it(`should emit 'move' event (async)`, async(() => {
        // Arrange
        let resultTodos: ToDo;

        // Act
        component.moveTodosComponentEmitter.subscribe(todos => { resultTodos = todos; });    // Subscribe to 'move' event
        component.onMoveTodo(expectedTodos);

        // Assert
        expect(resultTodos).toEqual(expectedTodos);
    }));

    it(`should emit 'clear' event (async)`, async(() => {
        // Arrange
        let resultClearState: boolean;

        // Act
        component.clearTodosComponentEmitter.subscribe(state => { resultClearState = state; });    // Subscribe to 'clear' event
        component.onClearCompleted(true);

        // Assert
        expect(resultClearState).toEqual(true);
    }));

    it(`should emit 'clearHover' event (async)`, async(() => {
        // Arrange
        let resultClearCompletetHoverState: boolean;

        // Act
        component.clearHoverStateTodosComponentEmitter.subscribe(state => {
            resultClearCompletetHoverState = state;    // Subscribe to 'clearHover' event
        });
        component.onClearHoverSetState(true);

        // Assert
        expect(resultClearCompletetHoverState).toEqual(true);
    }));

});
