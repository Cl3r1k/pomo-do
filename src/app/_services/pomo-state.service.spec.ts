import { TestBed } from '@angular/core/testing';

// Services
import { PomoStateService } from './pomo-state.service';

// Models
import { PomoState } from '@app/_models/pomo-state';

describe('Service: PomoStateService', () => {

    let service: PomoStateService;
    let store = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: []
        });

        service = TestBed.get(PomoStateService);

        const mockLocalStorage = {
            getItem: (key: string): string => {
                return key in store ? store[key] : null;
            },
            setItem: (key: string, value: string) => {
                store[key] = `${value}`;
            }
        };

        spyOn(localStorage, 'getItem').and.callFake(mockLocalStorage.getItem);
        spyOn(localStorage, 'setItem').and.callFake(mockLocalStorage.setItem);
    });

    it('Should be created', () => {
        // Arrange

        // Act

        // Assert
        expect(service).toBeTruthy();
    });

    it('Should have initial values', () => {
        // Arrange

        // Act

        // Assert
        expect(service.pomoLength).toEqual(1);
        expect(service.restLength).toEqual(1);
        expect(service.pomoState).toBeUndefined();
        expect(service.recentPomos).toEqual([]);
    });

    describe(`#initPomoState()`, () => {
        it(`Should init 'pomoState'`, () => {
            // Arrange

            // Act
            service.initPomoState();

            // Assert
            expect(service.pomoState.start_time).toBeTruthy();
            expect(service.pomoState.end_time).toBeTruthy();
            expect(service.pomoState.status).toEqual('started');
            expect(service.pomoState.uuid).toBeTruthy();
        });

        it(`Should call 'savePomoState()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'savePomoState');
            service.initPomoState();

            // Assert
            expect(service.savePomoState).toHaveBeenCalled();
        });
    });

    describe(`#savePomoState()`, () => {
        it(`Should store 'pomoState' in localStorage`, () => {
            // Arrange
            service.pomoState = new PomoState();
            service.pomoState.start_time = new Date().toISOString();

            // Act
            service.savePomoState();

            // Assert
            expect(localStorage.getItem('app_pomo_state')).toEqual(JSON.stringify(service.pomoState));
        });
    });

    describe(`#loadPomoState()`, () => {
        it(``, () => {
            //
        });
    });

});
