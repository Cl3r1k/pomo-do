import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardDetailsComponent } from './stat-card-details.component';

describe('StatCardDetailsComponent', () => {
  let component: StatCardDetailsComponent;
  let fixture: ComponentFixture<StatCardDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatCardDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatCardDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
