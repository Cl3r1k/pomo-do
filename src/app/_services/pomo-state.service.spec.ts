import { TestBed } from '@angular/core/testing';

// Services
import { PomoStateService } from './pomo-state.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';

// Models
import { PomoState } from '@app/_models/pomo-state';
import { Pomo } from '@app/_models/pomo';

// Modules
import { Utils } from '@app/_common/utils';

// Mocks
import { IndexedDbMockService } from '@app/_services/indexed-db-mock.service';
import { LocalStorageMock } from '@app/_testing/localStorage-mock';

describe('Service: PomoStateService', () => {

    let service: PomoStateService;
    let indexedDbService: IndexedDbService;
    const store = {};

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [Utils,
                {
                    provide: IndexedDbService,
                    useClass: IndexedDbMockService
                }
            ]
        });

        service = TestBed.get(PomoStateService);
        indexedDbService = TestBed.get(IndexedDbService);

        const localStorageMock = new LocalStorageMock();

        spyOn(localStorage, 'getItem').and.callFake(localStorageMock.localStorageMockObject.getItem);
        spyOn(localStorage, 'setItem').and.callFake(localStorageMock.localStorageMockObject.setItem);
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
            service.interruptPomo(false);

            // Assert
            expect(service.setIdlePomoState).toHaveBeenCalled();
        });

        it(`Should set 'end_time' for 'pomoState'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            service.interruptPomo(false);

            // Assert
            expect(service.pomoState.end_time).toBeTruthy();
        });

        it(`Should call 'savePomoState()'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'savePomoState');
            service.interruptPomo(false);

            // Assert
            expect(service.savePomoState).toHaveBeenCalled();
        });

        it(`Should call 'saveCompletedPomo()' if argument is 'false'`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'saveCompletedPomo');
            service.interruptPomo(false);

            // Assert
            expect(service.saveCompletedPomo).toHaveBeenCalled();
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

        it(`Should set real duration time for 'duration' member for new 'Pomo' in 'recentPomos' list`, () => {
            // Arrange
            service.pomoState = new PomoState();
            service.pomoState.start_time = new Date('2019-06-03T03:34:11.000Z').toISOString();
            service.pomoState.end_time = new Date('2019-06-03T03:35:12.000Z').toISOString();

            // Act
            service.saveCompletedPomo('Test pomoName (duration test)');

            // Assert
            expect(service.recentPomos.length).toEqual(1);
            expect(service.recentPomos[0].start_time).toEqual(service.pomoState.start_time);
            expect(service.recentPomos[0].duration).toEqual(61);
        });

        it(`Should call 'savePomoList()'  if the argument is not empty`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'savePomoList');
            service.saveCompletedPomo('Test pomoName (savePomoList)');

            // Assert
            expect(service.savePomoList).toHaveBeenCalled();
        });

        it(`Should call 'savePomoState()' if the argument is not empty`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            spyOn(service, 'savePomoState');
            service.saveCompletedPomo('Test pomoName (savePomoState)');

            // Assert
            expect(service.savePomoState).toHaveBeenCalled();
        });

        it(`Should call 'setIdlePomoState()' if the argument is not empty`, () => {
            // Arrange
            service.pomoState = new PomoState();
            service.pomoState.start_time = new Date('2019-06-03T03:34:11.000Z').toISOString();
            service.pomoState.end_time = new Date('2019-06-03T03:35:12.000Z').toISOString();

            // Act
            spyOn(service, 'setIdlePomoState');
            service.saveCompletedPomo('');

            // Assert
            expect(service.setIdlePomoState).toHaveBeenCalled();
        });

        // it(`Should call 'indexedDbService.savePomo()'`, () => {
        //     // Arrange
        //     service.pomoState = new PomoState();

        //     // Act
        //     spyOn(indexedDbService, 'savePomo');
        //     service.saveCompletedPomo('Test pomoName (savePomoState)');

        //     // Assert
        //     expect(indexedDbService.savePomo).toHaveBeenCalled();
        // });
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
        it(`Should load 'recentPomos' list from IndexedDb and localStorage`, () => {
            // Arrange
            service.pomoState = new PomoState();

            // Act
            service.saveCompletedPomo('Test pomoName 123');
            service.savePomoList();
            service.loadPomoList();

            // Assert
            expect(service.recentPomos.length).toEqual(1);
            expect(service.recentPomos[0].title).toEqual('Pomo title from IndexedDbMockService');
        });

        it(`Should call 'getItem()' of localStorage`, () => {
            // Arrange

            // Act
            service.loadPomoList();

            // Assert
            expect(localStorage.getItem).toHaveBeenCalled();
        });

        it(`Should call 'generatePomoListView()'`, () => {
            // Arrange

            // Act
            spyOn(service, 'generatePomoListView');
            service.loadPomoList();

            // Assert
            expect(service.generatePomoListView).toHaveBeenCalled();
        });
    });

    describe(`#generatePomoListView()`, () => {
        it(`Should 'recentPomosView' countain processed list of pomos`, () => {
            // Arrange
            const pomo1 = new Pomo('Todo with priority 1 (TST)', '2019-06-20T04:03:36.000Z', '1', false);
            pomo1.end_time = '2019-06-20T04:04:36.000Z';
            const pomo2 = new Pomo('1. Add more todos! (TST)', '2019-06-24T03:54:40.000Z', '2', false);
            pomo2.end_time = '2019-06-24T03:55:40.000Z';
            const pomo3 = new Pomo('Todo with priority 1 (TST)', '2019-06-24T03:57:28.000Z', '3', false);
            pomo3.end_time = '2019-06-24T03:58:28.000Z';
            const pomo4 = new Pomo('', '2019-06-25T03:37:19.000Z', '4', true);
            pomo4.end_time = '2019-06-25T03:38:28.446Z';

            service.recentPomos = [ pomo1, pomo2, pomo3, pomo4 ];

            const expectedRecentPomosView = [];

            // Act
            service.generatePomoListView();

            // Assert
            expect(service.recentPomosView.length).toEqual(2);
            expect(service.recentPomosView[0]['dateGroup']).toEqual('Jun 24');
            expect(service.recentPomosView[0]['pomosCount']).toEqual(2);
            expect(service.recentPomosView[0]['pomosArray'].length).toEqual(2);
            expect(service.recentPomosView[0]['pomosArray'][0]['title']).toEqual('Todo with priority 1 (TST)');
            expect(service.recentPomosView[1]['dateGroup']).toEqual('Jun 20');
            expect(service.recentPomosView[1]['pomosCount']).toEqual(1);
            expect(service.recentPomosView[1]['pomosArray'].length).toEqual(1);
            expect(service.recentPomosView[1]['pomosArray'][0]['title']).toEqual('Todo with priority 1 (TST)');
        });
    });

    describe(`#getPomosCount()`, () => {
        it(`Should return summ of field 'counter' in given array`, () => {
            // Arrange
            // Create test-case array with only field 'counter'
            const pomosArray = [ { counter: 1 }, { counter: 2 }, { counter: 3 }];

            // Act
            const result = service.getPomosCount(pomosArray);

            // Assert
            expect(result).toEqual(6);
        });
    });

});
