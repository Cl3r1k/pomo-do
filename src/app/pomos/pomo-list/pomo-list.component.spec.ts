import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { PomoListComponent } from './pomo-list.component';

// Services
import { PomoStateService } from '@app/_services/pomo-state.service';
import { IndexedDbService } from '@app/_services/indexed-db.service';

// Directives
import { TooltipDirective } from '@app/_directives/tooltip.directive';

// Mocks
import { PomoStateMockService } from '@app/_services/pomo-state-mock.service';
import { IndexedDbMockService } from '@app/_services/indexed-db-mock.service';

describe('PomoListComponent', () => {
    let component: PomoListComponent;
    let fixture: ComponentFixture<PomoListComponent>;
    let pomoStateService: PomoStateService;
    let indexedDbService: IndexedDbService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomoListComponent, TooltipDirective],
            providers: [
                {
                    provide: PomoStateService,
                    useClass: PomoStateMockService
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
        fixture = TestBed.createComponent(PomoListComponent);
        component = fixture.componentInstance;

        pomoStateService = TestBed.get(PomoStateService);
        indexedDbService = TestBed.get(IndexedDbService);
        const resultPomosGroup = { dateGroup: 'Jun 14', pomosCount: 1, pomosArray: [ { title: 'Test pomo title' } ] };
        pomoStateService.recentPomosView.push(resultPomosGroup);

        fixture.detectChanges();
    });

    it(`Should create an instance of 'PomoHeaderComponent'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    describe(`#view tests:`, () => {
        it(`Should have section.pomo-list element if 'pomoStateService.recentPomosView' is not empty`, () => {
            // Arrange
            const sectionPomoListtEl = fixture.debugElement.query(By.css('section.pomo-list'));    // Find 'section.pomo-list' element

            // Act

            // Assert
            expect(pomoStateService.recentPomosView.length).toEqual(1);
            expect(sectionPomoListtEl).toBeTruthy();
        });

        it(`Should have '.empty-sync-pomo-list-container' element if 'pomoStateService.recentPomosView' is empty`, () => {
            // Arrange
            pomoStateService.recentPomosView = [];
            fixture.detectChanges();
            const emptySyncPomoListEl = fixture.debugElement.query(By.css('div.empty-sync-pomo-list-container'));    // Find 'div' element

            // Act

            // Assert
            expect(pomoStateService.recentPomosView.length).toEqual(0);
            expect(emptySyncPomoListEl).toBeTruthy();
        });

        it(`Should have '.empty-pomo-list' element if 'pomoStateService.recentPomosView' is empty and 'isSyncing' = false`, () => {
            // Arrange
            pomoStateService.recentPomosView = [];
            component.isSyncing = false;
            fixture.detectChanges();
            const emptyPomoListEl = fixture.debugElement.query(By.css('div.empty-pomo-list'));    // Find 'div' element

            // Act

            // Assert
            expect(pomoStateService.recentPomosView.length).toEqual(0);
            expect(component.isSyncing).toEqual(false);
            expect(emptyPomoListEl).toBeTruthy();
        });

        it(`Should have '.sync-pomo-list' element if 'pomoStateService.recentPomosView' is empty and 'isSyncing' = true`, () => {
            // Arrange
            pomoStateService.recentPomosView = [];
            component.isSyncing = true;
            fixture.detectChanges();
            const syncPomoListEl = fixture.debugElement.query(By.css('div.sync-pomo-list'));    // Find 'div' element

            // Act

            // Assert
            expect(pomoStateService.recentPomosView.length).toEqual(0);
            expect(component.isSyncing).toEqual(true);
            expect(syncPomoListEl).toBeTruthy();
        });
    });

});
