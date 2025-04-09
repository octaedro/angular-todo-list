import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';
import { TodoStorageService } from '../../services/todo-storage.service';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { of } from 'rxjs';
import { Todo } from '../../todo.types';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoStorageService: jasmine.SpyObj<TodoStorageService>;
  let dialog: jasmine.SpyObj<MatDialog>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ConfirmationDialogComponent>>;

  beforeEach(async () => {
    todoStorageService = jasmine.createSpyObj('TodoStorageService', [
      'saveTodos',
      'saveFilter'
    ]);
    todoStorageService.todos$ = of([]);
    todoStorageService.filter$ = of('all');
    dialog = jasmine.createSpyObj('MatDialog', ['open']);
    dialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClosed']);

    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatDialogModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule
      ],
      declarations: [
        TodoListComponent,
        TodoItemComponent,
        ConfirmationDialogComponent
      ],
      providers: [
        { provide: TodoStorageService, useValue: todoStorageService },
        { provide: MatDialog, useValue: dialog }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    component.todosSubject$.next([]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new todo', () => {
    component.newTodo = 'Test Todo';
    component.addTodo();
    expect(todoStorageService.saveTodos).toHaveBeenCalled();
  });

  it('should not add empty todo', () => {
    component.newTodo = '';
    component.addTodo();
    expect(todoStorageService.saveTodos).not.toHaveBeenCalled();
  });

  it('should set filter correctly', () => {
    component.setFilter('completed');
    expect(todoStorageService.saveFilter).toHaveBeenCalledWith('completed');
  });

  it('should toggle todo completion', () => {
    const todo: Todo = { id: 1, title: 'Test Todo', completed: false };
    component.onToggleTodo(todo.id);
    expect(todoStorageService.saveTodos).toHaveBeenCalled();
  });

  it('should delete todo', async () => {
    const todo: Todo = { id: 1, title: 'Test Todo', completed: false };
    component.todosSubject$.next([todo]);
    dialogRef.afterClosed.and.returnValue(of(true));
    dialog.open.and.returnValue(dialogRef);
    await component.onDeleteTodo(todo.id);
    expect(todoStorageService.saveTodos).toHaveBeenCalledWith([]);
  });

  it('should not delete todo if cancelled', () => {
    const todo: Todo = { id: 1, title: 'Test Todo', completed: false };
    dialogRef.afterClosed.and.returnValue(of(false));
    dialog.open.and.returnValue(dialogRef);
    component.onDeleteTodo(todo.id);
    expect(todoStorageService.saveTodos).not.toHaveBeenCalled();
  });
});
