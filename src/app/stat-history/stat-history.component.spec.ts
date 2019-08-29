import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatHistoryComponent } from './stat-history.component';

describe('StatHistoryComponent', () => {
  let component: StatHistoryComponent;
  let fixture: ComponentFixture<StatHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
