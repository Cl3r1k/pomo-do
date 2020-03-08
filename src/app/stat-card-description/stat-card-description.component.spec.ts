import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatCardDescriptionComponent } from './stat-card-description.component';

describe('StatCardDescriptionComponent', () => {
  let component: StatCardDescriptionComponent;
  let fixture: ComponentFixture<StatCardDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatCardDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatCardDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
