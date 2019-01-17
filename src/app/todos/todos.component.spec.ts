import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { TodosComponent } from '@app/todos/todos.component';

describe(`Component: TodosComponent`, () => {
    let component: TodosComponent;
    let fixture: ComponentFixture<TodosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TodosComponent
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`Should create the app (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    // TODO: Rewrite test for 'TodosComponent' (currently not complete)
});
