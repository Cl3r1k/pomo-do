import { TestBed } from '@angular/core/testing';

// Services
import { JwtService } from './jwt.service';

// Mocks
import { LocalStorageMock } from '@app/_testing/localStorage-mock';

describe('Service: JwtService', () => {

    let service: JwtService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            //
        });

        service = TestBed.get(JwtService);

        const localStorageMock = new LocalStorageMock();

        spyOn(localStorage, 'getItem').and.callFake(localStorageMock.localStorageMockObject.getItem);
        spyOn(localStorage, 'setItem').and.callFake(localStorageMock.localStorageMockObject.setItem);
        spyOn(localStorage, 'removeItem').and.callFake(localStorageMock.localStorageMockObject.removeItem);
        spyOn(localStorage, 'clear').and.callFake(localStorageMock.localStorageMockObject.clear);
    });

    it('should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    describe(`saveToken()`, () => {
        it(`should store the token in localStorage`, () => {
            // Arrange

            // Act
            service.saveToken('Some.Token');

            // Assert
            expect(localStorage.getItem('session_data')).toEqual('"Some.Token"');
        });
    });

    describe(`getToken()`, () => {
        it(`should return stored token from localStorage`, () => {
            // Arrange

            // Act
            service.saveToken('Another.Token');

            // Assert
            expect(localStorage.getItem('session_data')).toEqual('"Another.Token"');
        });

        it(`should return 'null' from localStorage when there is no token`, () => {
            // Arrange

            // Act
            service.destroyToken();

            // Assert
            expect(localStorage.getItem('session_data')).toEqual(null);
        });
    });

    describe(`destroyToken()`, () => {
        it(`should remove previously stored token in localStorage`, () => {
            // Arrange

            // Act
            service.saveToken('ToDelete.Token');

            // Assert
            expect(localStorage.getItem('session_data')).toEqual('"ToDelete.Token"');
            service.destroyToken();
            expect(localStorage.getItem('session_data')).toEqual(null);
        });
    });

});
