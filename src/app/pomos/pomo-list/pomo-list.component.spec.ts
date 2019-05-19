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
    let sectionPomoListtEl;

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

        fixture.detectChanges();
    });

    it(`Should create an instance of 'PomoHeaderComponent'`, () => {
        // Arrange

        // Act

        // Assert
        expect(component).toBeTruthy();
    });

    describe(`#view tests:`, () => {
        it(`Should have section.pomo-list element`, () => {
            // Arrange
            sectionPomoListtEl = fixture.debugElement.query(By.css('section.pomo-list'));    // Find 'section.pomo-list' element

            // Act

            // Assert
            expect(sectionPomoListtEl).toBeTruthy();
        });
    });

});
