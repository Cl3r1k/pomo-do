import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PomosComponent } from './pomos.component';

describe('PomosComponent', () => {
    let component: PomosComponent;
    let fixture: ComponentFixture<PomosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PomosComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PomosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
