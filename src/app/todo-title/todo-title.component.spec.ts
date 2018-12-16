import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@app/_services/auth.service';
import { AuthMockService } from '@app/_services/auth-mock.service';

// Directives
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Components
import { TodoTitleComponent } from '@app/todo-title/todo-title.component';

// Modules
import { MatDialogModule } from '@angular/material';

class MockRouter {
    navigate(path) { }
}


describe('Component: TodoTitleComponent', () => {
    let component: TodoTitleComponent;
    let fixture: ComponentFixture<TodoTitleComponent>;
    let componentService: AuthService;
    let componentRouter: Router;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatDialogModule],
            declarations: [TodoTitleComponent, TooltipDirective],
            providers: [
                {
                    provide: Router,
                    useClass: MockRouter
                },
                {
                    provide: AuthService,
                    useClass: AuthMockService
                }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        // Configure the component with another set of Providers
        TestBed.overrideComponent(
            TodoTitleComponent,
            {
                set: {
                    providers: [{ provide: AuthService, useClass: AuthMockService },
                    { provide: Router, useClass: MockRouter }]
                }
            }
        );

        fixture = TestBed.createComponent(TodoTitleComponent);
        component = fixture.componentInstance;

        // AuthService provided by Component, (should return AuthMockService)
        componentService = fixture.debugElement.injector.get(AuthService);
        componentRouter = fixture.debugElement.injector.get(Router);

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

    it('Service injected via component should be and instance of AuthMockService', () => {
        // Arrange

        // Act

        // Assert
        expect(componentService instanceof AuthMockService).toBeTruthy();
    });

    it('Router injected via component should be and instance of MockRouter', () => {
        // Arrange

        // Act

        // Assert
        expect(componentRouter instanceof MockRouter).toBeTruthy();
    });

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
        it(`should navigate to 'sign-in' page for a logged out user`, () => {
            // Arrange
            // authService = { isSignedIn: () => true };

            // Act
            spyOn(componentRouter, 'navigate');
            component.doSignOut();

            // Assert
            expect(componentRouter.navigate).toHaveBeenCalledWith(['/sign-in']);
        });

        it(`should call method 'doSignOut()' of the 'AuthMockService'`, () => {
            // Arrange

            // Act
            spyOn(componentService, 'doSignOut');
            component.doSignOut();

            // Assert
            expect(componentService.doSignOut).toHaveBeenCalled();
        });
    });

    describe(`#showAccountDialog()`, () => {
        it(``, () => {
            //
        });
    });
});
