import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
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
  /** Input field value for new todo */
  newTodo = '';

  /** Current filter state */
  currentFilter: TodoFilter = 'all';

  /** Subject for managing filter state */
  private filterSubject$ = new BehaviorSubject<TodoFilter>('all');

  /** Subject for managing todos list */
  private todosSubject$ = new BehaviorSubject<Todo[]>([]);

  /** Subscription manager for cleanup */
  private subscription = new Subscription();

  /**
   * Observable that combines todos and filter to provide filtered todos list
   * Uses distinctUntilChanged to prevent unnecessary updates
   */
  filteredTodos$ = combineLatest([
    this.todosSubject$.pipe(distinctUntilChanged()),
    this.filterSubject$.pipe(distinctUntilChanged())
  ]).pipe(
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

  /**
   * Initialize component by subscribing to storage service observables
   */
  ngOnInit() {
    // Subscribe to todos from storage
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

  /**
   * Cleanup subscriptions to prevent memory leaks
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Adds a new todo to the list
   * Validates input and generates a unique ID using timestamp
   */
  addTodo(): void {
    const trimmedTodo = this.newTodo.trim();
    if (!trimmedTodo) return;

    const newTodo: Todo = {
      id: Date.now(), // Using timestamp as ID for simplicity
      title: trimmedTodo,
      completed: false
    };

    const currentTodos = this.todosSubject$.value;
    const updatedTodos = [...currentTodos, newTodo];
    this.todoStorage.saveTodos(updatedTodos);
    this.newTodo = ''; // Clear input after adding
  }

  /**
   * Updates the current filter and persists it
   * @param filter - The new filter to apply
   */
  setFilter(filter: TodoFilter): void {
    this.todoStorage.saveFilter(filter);
  }

  /**
   * Toggles the completion status of a todo
   * @param todoId - ID of the todo to toggle
   */
  onToggleTodo(todoId: number): void {
    const currentTodos = this.todosSubject$.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    this.todoStorage.saveTodos(updatedTodos);
  }

  /**
   * Deletes a todo after confirmation
   * @param todoId - ID of the todo to delete
   */
  async onDeleteTodo(todoId: number): Promise<void> {
    const todoToDelete = this.todosSubject$.value.find(todo => todo.id === todoId);
    if (!todoToDelete) return;

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { taskTitle: todoToDelete.title },
      width: '400px',
      disableClose: true // Force user to make a choice
    });

    const result = await dialogRef.afterClosed().toPromise();
    if (result) {
      const currentTodos = this.todosSubject$.value;
      const updatedTodos = currentTodos.filter(todo => todo.id !== todoId);
      this.todoStorage.saveTodos(updatedTodos);
    }
  }
}
