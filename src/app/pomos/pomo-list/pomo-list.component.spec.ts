import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoListComponent } from './pomo-list.component';

describe('PomoListComponent', () => {
    let component: PomoListComponent;
    let fixture: ComponentFixture<PomoListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomoListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PomoListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
