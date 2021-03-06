import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { ActiveTaskComponent } from './active-task.component';

describe('Component: ActiveTaskComponent', () => {
    let component: ActiveTaskComponent;
    let fixture: ComponentFixture<ActiveTaskComponent>;
    let expectedTodo: ToDo;
    let svgCheckEl;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ActiveTaskComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActiveTaskComponent);
        component = fixture.componentInstance;

        expectedTodo = new ToDo({ id: 1, title: 'Test title in TodoListItemViewComponent', complete: false });
        component.todo = expectedTodo;                    // Lets count that we have todo with 'complete' = false
        fixture.detectChanges();

        svgCheckEl = fixture.debugElement.query(By.css('svg.icon-checkmark'));           // Find svg.icon-checkmark element

        fixture.detectChanges();
    });

    it(`should create an instance of 'ActiveTaskComponent'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it('should be equal to expectedTodo', () => {
        // Arrange

        // Act

        // Assert
        expect(component.todo).toEqual(expectedTodo);
    });

    describe(`#toggleComplete(): `, () => {
        it(`should emit 'toggleComplete' event (async)`, async(() => {
            // Arrange
            let todo: ToDo;

            // Act
            component.toggleCompleteActiveTaskComponentEmitter.subscribe((value) => todo = value);    // Subscribe to 'toggle' event
            component.toggleComplete(expectedTodo);

            // Assert
            expect(todo).toEqual(expectedTodo);
        }));
    });

    describe(`#view tests:`, () => {

        describe(`svg.icon-checkmark:`, () => {
            it(`clicking on 'svg.icon-checkmark' should call method 'toggleComplete()' (async)`, async () => {
                // Arrange

                // Act
                spyOn(component, 'toggleComplete');
                if (svgCheckEl instanceof HTMLElement) {
                    svgCheckEl.click();
                } else {
                    svgCheckEl.triggerEventHandler('click', { button: 0 });
                }

                // Assert
                fixture.whenStable().then(() => {
                    expect(component.toggleComplete).toHaveBeenCalled();
                });
            });
        });
    });
});
