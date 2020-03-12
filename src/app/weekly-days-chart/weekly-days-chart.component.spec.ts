import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyDaysChartComponent } from './weekly-days-chart.component';

describe('WeeklyDaysChartComponent', () => {
  let component: WeeklyDaysChartComponent;
  let fixture: ComponentFixture<WeeklyDaysChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeeklyDaysChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyDaysChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
