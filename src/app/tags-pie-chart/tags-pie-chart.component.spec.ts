import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPieChartComponent } from './tags-pie-chart.component';

describe('TagsPieChartComponent', () => {
  let component: TagsPieChartComponent;
  let fixture: ComponentFixture<TagsPieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsPieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsPieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
