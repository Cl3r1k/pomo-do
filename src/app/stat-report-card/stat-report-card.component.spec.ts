import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatReportCardComponent } from './stat-report-card.component';

describe('StatReportCardComponent', () => {
  let component: StatReportCardComponent;
  let fixture: ComponentFixture<StatReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatReportCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
