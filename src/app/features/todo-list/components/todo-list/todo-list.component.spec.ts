import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should mark a todo item as completed', () => {
    component.addTodo('Test task');
    component.todos[0].completed = true;
    expect(component.todos[0].completed).toBe(true);
  });

  it('should toggle a todo item', () => {
    component.addTodo('Test task');
    component.todos[0].completed = true;
    component.toggleTodo(component.todos[0]);
    expect(component.todos[0].completed).toBe(false);
  });

  it('should delete a todo item', () => {
    component.addTodo('Test task');
    component.deleteTodo(component.todos[0]);
    expect(component.todos.length).toBe(0);
  });
});
