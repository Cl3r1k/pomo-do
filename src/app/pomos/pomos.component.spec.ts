import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Models
import { ToDo } from '@app/_models/to-do';

// Components
import { PomosComponent } from './pomos.component';
import { PomoHeaderComponent } from '@app/pomos/pomo-header/pomo-header.component';
import { PomoListComponent } from '@app/pomos/pomo-list/pomo-list.component';

// Services
import { TodoOrderService } from '@app/_services/todo-order.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';

// Directives
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Modules
import { MatDialogModule } from '@angular/material';

// Mocks
import { TodoOrderMockService } from '@app/_services/todo-order-mock.service';
import { IndexedDbMockService } from '@app/_services/indexed-db-mock.service';

describe('Component: PomosComponent', () => {
    let component: PomosComponent;
    let fixture: ComponentFixture<PomosComponent>;
    let expectedTodo;
    let indexedDbService: IndexedDbService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomosComponent, PomoHeaderComponent, PomoListComponent, TooltipDirective],
            imports: [FormsModule, MatDialogModule],
            providers: [
                {
                    provide: TodoOrderService,
                    useClass: TodoOrderMockService
                },
                {
                    provide: IndexedDbService,
                    useClass: IndexedDbMockService
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PomosComponent);
        component = fixture.componentInstance;

        indexedDbService = TestBed.get(IndexedDbService);

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
