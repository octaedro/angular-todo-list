import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TodoListComponent } from './todo-list.component';
import { TodoItemComponent } from '../todo-item/todo-item.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TodoListComponent, TodoItemComponent],
      imports: [FormsModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodo = 'Test task';
    component.addTodo();
    expect(component.todosSubject$.value.length).toBe(1);
    expect(component.todosSubject$.value[0].title).toBe('Test task');
    expect(component.todosSubject$.value[0].completed).toBe(false);
  });

  it('should not add empty todo', () => {
    component.newTodo = '   ';
    component.addTodo();
    expect(component.todosSubject$.value.length).toBe(0);
  });

  it('should set filter correctly', () => {
    component.setFilter('completed');
    expect(component.currentFilter).toBe('completed');
  });

  it('should toggle todo completion', () => {
    component.newTodo = 'Test task';
    component.addTodo();
    const todoId = component.todosSubject$.value[0].id;
    component.onToggleTodo(todoId);
    expect(component.todosSubject$.value[0].completed).toBe(true);
  });

  it('should delete todo', () => {
    component.newTodo = 'Test task';
    component.addTodo();
    const todoId = component.todosSubject$.value[0].id;
    component.onDeleteTodo(todoId);
    expect(component.todosSubject$.value.length).toBe(0);
  });
});
