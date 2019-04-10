import { TestBed } from '@angular/core/testing';

// Services
import { PomoStateService } from './pomo-state.service';

// Models
import { PomoState } from '@app/_models/pomo-state';

describe('Service: PomoStateService', () => {

    let service: PomoStateService;
    const store = {};

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

        it(`Should call 'setItem()' of localStorage`, () => {
            // Arrange
            service.pomoState = new PomoState();
            service.pomoState.start_time = new Date().toISOString();

            // Act
            service.savePomoState();

            // Assert
            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });

    describe(`#loadPomoState()`, () => {
        it(`Should set 'pomoState' saved in localStorage`, () => {
            // Arrange
            const tmpPomoState = new PomoState();
            tmpPomoState.start_time = new Date().toISOString();
            service.pomoState = tmpPomoState;
            service.savePomoState();
            service.pomoState = null;

            // Act
            service.loadPomoState();

            // Assert
            expect(service.pomoState.start_time).toEqual(tmpPomoState.start_time);
        });

        it(`Should call 'getItem()' of localStorage`, () => {
            // Arrange

            // Act
            service.loadPomoState();

            // Assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });

    describe(`#interruptPomo()`, () => {
        it(`Should call 'setIdlePomoState()'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'setIdlePomoState');
            service.interruptPomo();

            // Assert
            expect(service.setIdlePomoState).toHaveBeenCalled();
        });

        it(`Should set 'end_time' for 'pomoState'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            service.interruptPomo();

            // Assert
            expect(service.pomoState.end_time).toBeTruthy();
        });

        it(`Should call 'savePomoState()'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'savePomoState');
            service.interruptPomo();

            // Assert
            expect(service.savePomoState).toHaveBeenCalled();
        });
    });

    describe(`#setIdlePomoState()`, () => {
        it(`Should set 'pomoState.status' to 'idle' `, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            service.setIdlePomoState();

            // Assert
            expect(service.pomoState.status).toEqual('idle');
        });
    });

    describe(`#saveCompletedPomo()`, () => {
        it(`Should push new 'Pomo' in 'recentPomos' list`, () => {
            // Arrange
            service.pomoState = new PomoState();
            service.pomoState.start_time = new Date().toISOString();

            // Act
            service.saveCompletedPomo('Test pomoName 1');

            // Assert
            expect(service.recentPomos.length).toEqual(1);
            expect(service.recentPomos[0].start_time).toEqual(service.pomoState.start_time);
        });

        it(`Should call 'savePomoList()'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'savePomoList');
            service.saveCompletedPomo('Test pomoName (savePomoList)');

            // Assert
            expect(service.savePomoList).toHaveBeenCalled();
        });

        it(`Should call 'savePomoState()'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'savePomoState');
            service.saveCompletedPomo('Test pomoName (savePomoState)');

            // Assert
            expect(service.savePomoState).toHaveBeenCalled();
        });
    });

    describe(`#savePomoList()`, () => {

        it(`Should save empty 'recentPomos' list and 'account_id' in localStorage`, () => {
            // Arrange
            let data = Object();

            // Act
            service.savePomoList();
            data = JSON.parse(localStorage.getItem('recentPomoList'));

            // Assert
            expect(data['account_id']).toEqual('123456');
            expect(data['pomos'].length).toEqual(0);
        });

        it(`Should save 'recentPomos' list and 'account_id' in localStorage`, () => {
            // Arrange
            let data = Object();
            service.pomoState = new PomoState();

            // Act
            service.saveCompletedPomo('Test pomoName 1');
            service.savePomoList();
            data = JSON.parse(localStorage.getItem('recentPomoList'));

            // Assert
            expect(data['account_id']).toEqual('123456');
            expect(data['pomos'].length).toEqual(1);
            expect(data['pomos'][0]['title']).toEqual('Test pomoName 1');
        });

        it(`Should call 'setItem()' of localStorage`, () => {
            // Arrange

            // Act
            service.savePomoList();

            // Assert
            expect(localStorage.setItem).toHaveBeenCalled();
        });
    });

    describe(`#loadPomoList()`, () => {
        it(`Should load 'recentPomos' list from localStorage`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            service.saveCompletedPomo('Test pomoName 123');
            service.savePomoList();
            service.loadPomoList();

            // Assert
            expect(service.recentPomos.length).toEqual(1);
            expect(service.recentPomos[0].title).toEqual('Test pomoName 123');
        });

        it(`Should call 'getItem()' of localStorage`, () => {
            // Arrange

            // Act
            service.loadPomoList();

            // Assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });
    });

});
