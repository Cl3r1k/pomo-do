import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

// Services
import { AuthService } from '@app/_services/auth.service';
import { AuthMockService } from '@app/_services/auth-mock.service';

// Directives
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Components
import { AppHeaderComponent } from '@app/app-header/app-header.component';

// Modules
import { MatDialogModule, MatDialog } from '@angular/material';

// Mocks
import { MatDialogMock } from '@app/_testing/mat-dialog-mock';

class MockRouter {
    navigate(path) { }
}

describe('Component: AppHeaderComponent', () => {
    let component: AppHeaderComponent;
    let fixture: ComponentFixture<AppHeaderComponent>;
    let authService: AuthService;
    let router: Router;
    let dialog: MatDialogMock;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, MatDialogModule],
            declarations: [AppHeaderComponent, TooltipDirective],
            providers: [
                {
                    provide: Router,
                    useClass: MockRouter
                },
                {
                    provide: AuthService,
                    useClass: AuthMockService
                },
                {
                    provide: MatDialog,
                    useClass: MatDialogMock,
                }]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppHeaderComponent);
        component = fixture.componentInstance;

        // AuthService provided by TestBed, (should return AuthMockService)
        authService = TestBed.get(AuthService);
        router = TestBed.get(Router);
        dialog = TestBed.get(MatDialog);

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
        expect(authService instanceof AuthMockService).toBeTruthy();
    });

    it('Router injected via component should be and instance of MockRouter', () => {
        // Arrange

        // Act

        // Assert
        expect(router instanceof MockRouter).toBeTruthy();
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
            spyOn(router, 'navigate').and.callThrough();
            component.doSignOut();

            // Assert
            expect(router.navigate).toHaveBeenCalledWith(['/sign-in']);
        });

        it(`should call method 'doSignOut()' of the 'AuthMockService'`, () => {
            // Arrange

            // Act
            spyOn(authService, 'doSignOut').and.callThrough();
            component.doSignOut();

            // Assert
            expect(authService.doSignOut).toHaveBeenCalled();
        });
    });

    // Test idea took from `https://medium.com/@aleixsuau/testing-angular-components-with-material-dialog-mddialog-1ae658b4e4b3`
    // and from `https://github.com/vincent-cm/crazycard/blob/master/src/app/card/card.component.spec.ts`
    describe(`#showAccountDialog()`, () => {
        it(`should call MatDialog and should be open and after MatDialog should be closed`, () => {
            // Arrange

            // Act
            spyOn(dialog, 'open').and.callThrough();
            component.showAccountDialog();

            // Assert
            expect(dialog.open).toHaveBeenCalled();
        });
    });

    // TODO: Add test for 'showSettingsDialog()'
});
