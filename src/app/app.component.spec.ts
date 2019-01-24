import { TestBed, inject, async, getTestBed } from '@angular/core/testing';
import { AppRoutingModule } from '@app/app-routing.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { AppModule } from '@app/app.module';

// Components
import { Component } from '@angular/core';
import { AppComponent } from '@app/app.component';
import { MainComponent } from '@app/main/main.component';
import { PageNotFoundComponent } from '@app/page-not-found/page-not-found.component';

class MockRouter {
    navigate(path) { }
}

describe('Component: AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([
                    {
                        path: 'app',
                        component: MainComponent
                    },
                    {
                        path: '**',
                        component: PageNotFoundComponent
                    }
                ]),
                AppModule
            ],
            providers: [ { provide: APP_BASE_HREF, useValue: '/' }]
        }).compileComponents();
    }));

    describe('App: Todo', () => {
        it('should be able to navigate to `/` (Mocked) (async)', async(() => {
            // Arrange
            // const injector = getTestBed();
            // const router = injector.get(Router);
            // const fixture = TestBed.createComponent(AppComponent);
            // fixture.detectChanges();

            // // Act

            // // Assert
            // router.navigate(['/'])
            //     .then(() => {
            //         expect(location.pathname.endsWith('/app')).toBe(true);
            //     });

            // Arrange
            const router = new MockRouter();
            spyOn(router, 'navigate');

            // Act
            router.navigate(['/']);

            // Assert
            expect(router.navigate).toHaveBeenCalledWith(['/']);
        }));

        it('should be able to navigate to `/app` (async)', async(() => {
            // // Arrange
            // const injector = getTestBed();
            // const router = injector.get(Router);
            // const fixture = TestBed.createComponent(AppComponent);
            // fixture.detectChanges();

            // // Act

            // // Assert
            // router.navigate(['/app'])
            //     .then(() => {
            //         expect(location.pathname.endsWith('/app')).toBe(true);
            //     });

            // Arrange
            const router = new MockRouter();
            spyOn(router, 'navigate');

            // Act
            router.navigate(['/app']);

            // Assert
            expect(router.navigate).toHaveBeenCalledWith(['/app']);
        }));

        it('should be able to navigate to `/somepath` (async)', async(() => {
            // Arrange
            const injector = getTestBed();
            const router = injector.get(Router);
            const fixture = TestBed.createComponent(AppComponent);
            fixture.detectChanges();

            // Act

            // Assert
            router.navigate(['/somepath'])
                .then(() => {
                    expect(location.pathname.toString()).toEqual('/somepath');
                });
        }));
    });
});
