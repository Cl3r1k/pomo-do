import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCancelComponent } from './dialog-cancel.component';

describe('DialogCancelComponent', () => {
    let component: DialogCancelComponent;
    let fixture: ComponentFixture<DialogCancelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DialogCancelComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DialogCancelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
