import { TestBed, inject } from '@angular/core/testing';

import { SessionStorageService } from '@app/_services/session-storage.service';

describe('Service: SessionStorageService', () => {

    let sessionStorageService: SessionStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SessionStorageService]
        });

        sessionStorageService = TestBed.get(SessionStorageService);
    });

    it('should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(sessionStorageService).toBeTruthy();
    });

    describe(`#init()`, () => {
        it(`should set 'session_object' to initial values`, () => {
            // Arrange

            // Act
            sessionStorageService.init();

            // Assert
            expect(sessionStorageService.session_object.expire_time).toEqual('');
            expect(sessionStorageService.session_object.token).toEqual('');
            expect(sessionStorageService.session_object.account.avatar).toEqual('some_kind_of_avatar');
            expect(sessionStorageService.session_object.account.display_name).toEqual('');
            expect(sessionStorageService.session_object.account.email).toEqual('some_kind_of@email.com');
            expect(sessionStorageService.session_object.account.email_verified).toEqual(false);
            expect(sessionStorageService.session_object.account.id).toEqual('1');
            expect(sessionStorageService.session_object.account.jwToken).toEqual('');
            expect(sessionStorageService.session_object.account.name).toEqual('');
            expect(sessionStorageService.session_object.account.username).toEqual('');
        });
    });

    describe(`#destroy()`, () => {
        it(`should clear 'session_object'`, () => {
            // Arrange
            sessionStorageService.session_object.account.jwToken = 'Access.Token';
            sessionStorageService.session_object.account.name = 'Access.Name';

            // Act
            sessionStorageService.destroy();

            // Assert
            expect(sessionStorageService.session_object.created_time).toEqual(null);
            expect(sessionStorageService.session_object.expire_time).toEqual(null);
            expect(sessionStorageService.session_object.last_used_time).toEqual(null);
            expect(sessionStorageService.session_object.token).toEqual(null);
            expect(sessionStorageService.session_object.account.avatar).toEqual(null);
            expect(sessionStorageService.session_object.account.display_name).toEqual(null);
            expect(sessionStorageService.session_object.account.email).toEqual(null);
            expect(sessionStorageService.session_object.account.email_verified).toEqual(false);
            expect(sessionStorageService.session_object.account.id).toEqual(null);
            expect(sessionStorageService.session_object.account.jwToken).toEqual(null);
            expect(sessionStorageService.session_object.account.name).toEqual(null);
            expect(sessionStorageService.session_object.account.username).toEqual(null);
            expect(sessionStorageService.session_object.account.register_time).toEqual(null);
        });
    });

});
