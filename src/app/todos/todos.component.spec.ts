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

// Modules
import { DndModule } from '@beyerleinf/ngx-dnd';

describe(`Component: TodosComponent`, () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;
    let expectedTodo: ToDo;

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
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;

        expectedTodo = new ToDo({ id: 1, title: 'exp Todo', complete: false });

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

    // TODO: Update test for 'TodosComponent' (currently not complete)
});
