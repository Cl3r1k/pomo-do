import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { PomosComponent } from './pomos.component';
import { PomoHeaderComponent } from '@app/pomos/pomo-header/pomo-header.component';

// Services
import { TodoOrderService } from '@app/_services/todo-order.service';

// Modules
import { MatDialogModule } from '@angular/material';

// Mocks
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';

describe('Component: PomosComponent', () => {
    let component: PomosComponent;
    let fixture: ComponentFixture<PomosComponent>;
    let expectedTodo;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomosComponent, PomoHeaderComponent],
            imports: [FormsModule, MatDialogModule],
            providers: [
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PomosComponent);
        component = fixture.componentInstance;

        expectedTodo = new ToDo({ id: 1, title: 'Test title in PomoHeaderComponent', complete: false });
        expectedTodo.inner_id = '123456789';
        component.currentTodoPomos = expectedTodo;                    // Lets count that we have todo with 'complete' = false

        component.pomoStatePomos = 0;

        fixture.detectChanges();
    });

    it(`Should create an instance of 'PomoHeaderComponent'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    it(`Should have '@Input() pomoStatePomos' equal to `, () => {
        // Arrange

        // Act

        // Assert
        expect(component.pomoStatePomos).toEqual(0);
    });

    it(`Should have '@Input() pomoStatePomos' equal to `, () => {
        // Arrange

        // Act

        // Assert
        expect(component.currentTodoPomos).toEqual(expectedTodo);
    });

    describe(`onStatePomoChange#()`, () => {
        it(`Should emit 'statePomosComponentEmitter' event`, () => {
            // Arrange
            let result: number;

            // Act
            component.statePomosComponentEmitter.subscribe((value) => result = value);    // Subscribe to 'statePomosComponentEmitter' event
            component.onStatePomoChange(1);

            // Assert
            expect(result).toEqual(1);
        });
    });
});
