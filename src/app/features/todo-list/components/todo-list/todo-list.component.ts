import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoFilter } from '../../todo.types';
import { TodoStorageService } from '../../services/todo-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit, OnDestroy {
  newTodo = '';
  filterSubject$ = new BehaviorSubject<TodoFilter>('all');
  todosSubject$ = new BehaviorSubject<Todo[]>([]);
  currentFilter: TodoFilter = 'all';
  private subscription = new Subscription();

  filteredTodos$ = combineLatest([this.todosSubject$, this.filterSubject$]).pipe(
    map(([todos, filter]) => {
      switch (filter) {
        case 'completed':
          return todos.filter(todo => todo.completed);
        case 'incomplete':
          return todos.filter(todo => !todo.completed);
        default:
          return todos;
      }
    })
  );

  constructor(
    private todoStorage: TodoStorageService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Subscribe to storage service
    this.subscription.add(
      this.todoStorage.todos$.subscribe(todos => {
        this.todosSubject$.next(todos);
      })
    );

    // Subscribe to filter from storage
    this.subscription.add(
      this.todoStorage.filter$.subscribe(filter => {
        this.currentFilter = filter;
        this.filterSubject$.next(filter);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addTodo() {
    if (this.newTodo.trim()) {
      const newTodo: Todo = {
        id: Date.now(),
        title: this.newTodo.trim(),
        completed: false
      };
      const currentTodos = this.todosSubject$.value;
      const updatedTodos = [...currentTodos, newTodo];
      this.todoStorage.saveTodos(updatedTodos);
      this.newTodo = '';
    }
  }

  setFilter(filter: TodoFilter) {
    this.todoStorage.saveFilter(filter);
  }

  onToggleTodo(todoId: number) {
    const currentTodos = this.todosSubject$.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    this.todoStorage.saveTodos(updatedTodos);
  }

  async onDeleteTodo(todoId: number) {
    const todoToDelete = this.todosSubject$.value.find(todo => todo.id === todoId);
    if (!todoToDelete) return;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { taskTitle: todoToDelete.title }
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const currentTodos = this.todosSubject$.value;
      const updatedTodos = currentTodos.filter(todo => todo.id !== todoId);
      this.todoStorage.saveTodos(updatedTodos);
    }
  }
}
