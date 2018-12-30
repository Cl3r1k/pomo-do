import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCurrentComponent } from './todo-current.component';

describe('TodoCurrentComponent', () => {
  let component: TodoCurrentComponent;
  let fixture: ComponentFixture<TodoCurrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCurrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
