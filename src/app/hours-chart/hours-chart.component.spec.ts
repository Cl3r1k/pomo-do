import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoursChartComponent } from './hours-chart.component';

describe('HoursChartComponent', () => {
  let component: HoursChartComponent;
  let fixture: ComponentFixture<HoursChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoursChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoursChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
