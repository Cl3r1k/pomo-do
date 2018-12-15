import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthService } from '@app/_services/auth.service';
import { AuthMockService } from '@app/_services/auth-mock.service';

// Directives
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Components
import { TodoTitleComponent } from '@app/todo-title/todo-title.component';

// Modules
import { MatDialogModule } from '@angular/material';

describe('Component: TodoTitleComponent', () => {
    let component: TodoTitleComponent;
    let fixture: ComponentFixture<TodoTitleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatDialogModule],
            declarations: [TodoTitleComponent, TooltipDirective],
            providers: [
                {
                    provide: AuthService,
                    useClass: AuthMockService
                }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TodoTitleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`should create an instance (async)`, async(() => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    }));

    it('should display "Todo" in h1 tag (async)', async(() => {
        // Arrange
        const compiled = fixture.debugElement.nativeElement;

        // Act

        // Assert
        expect(compiled.querySelector('h1').textContent).toContain('Pomodo');
    }));

    describe(`#changeSyncState()`, () => {
        it(`should be...`, async(() => {
            // TODO: Update test when this method will be finished
            // Arrange

            // Act

            // Assert
        }));
    });

    describe(`#toggleSubmenuState()`, () => {
        it(`should reverse 'showSubmenuState' and emit 'subMenuStateAppTitleEmitter' event`, async(() => {
            // Arrange
            let subMenuState = false;

            // Act
            component.showSubmenuState = false;
            component.subMenuStateAppTitleEmitter.subscribe((value: boolean) => subMenuState = value);    // Subscribe to 'subMenuState' evt
            component.toggleSubmenuState();

            // Assert
            expect(component.showSubmenuState).toEqual(true);
            expect(subMenuState).toEqual(true);
        }));
    });

    describe(`#doSignOut()`, () => {
        it(`should call method 'purgeAuth()' and 'sessionStorageService.destroy()'`, () => {
            // Arrange
            // authService = { isSignedIn: () => true };

            // Act
            spyOn(component, 'doSignOut');
            component.doSignOut();

            // Assert
            // expect(service.doSignOut).toHaveBeenCalled();
        });
    });
});
