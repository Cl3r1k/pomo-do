import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomoHeaderComponent } from './pomo-header.component';

describe('PomoHeaderComponent', () => {
    let component: PomoHeaderComponent;
    let fixture: ComponentFixture<PomoHeaderComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomoHeaderComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PomoHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
