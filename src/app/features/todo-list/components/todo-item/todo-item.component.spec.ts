import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoItemComponent } from './todo-item.component';

describe('TodoItemComponent', () => {
  let component: TodoItemComponent;
  let fixture: ComponentFixture<TodoItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemComponent);
    component = fixture.componentInstance;
    component.todo = {
      id: 1,
      title: 'Test task',
      completed: false
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit toggle event', () => {
    spyOn(component.toggle, 'emit');
    component.onToggle();
    expect(component.toggle.emit).toHaveBeenCalledWith(component.todo);
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith(component.todo);
  });
});
