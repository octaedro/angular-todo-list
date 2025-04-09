import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo, TodoFilter } from '../todo.types';

@Injectable({
  providedIn: 'root'
})
export class TodoStorageService {
  private readonly TODOS_STORAGE_KEY = 'todos';
  private readonly FILTER_STORAGE_KEY = 'todoFilter';

  private todosSubject = new BehaviorSubject<Todo[]>(this.getStoredTodos());
  private filterSubject = new BehaviorSubject<TodoFilter>(this.getStoredFilter());

  todos$ = this.todosSubject.asObservable();
  filter$ = this.filterSubject.asObservable();

  constructor() {
    // Load todos and filter from storage on initialization
    this.loadTodos();
    this.loadFilter();
  }

  private getStoredTodos(): Todo[] {
    const storedTodos = localStorage.getItem(this.TODOS_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  }

  private getStoredFilter(): TodoFilter {
    const storedFilter = localStorage.getItem(this.FILTER_STORAGE_KEY);
    return (storedFilter as TodoFilter) || 'all';
  }

  private loadTodos(): void {
    const todos = this.getStoredTodos();
    this.todosSubject.next(todos);
  }

  private loadFilter(): void {
    const filter = this.getStoredFilter();
    this.filterSubject.next(filter);
  }

  saveTodos(todos: Todo[]): void {
    localStorage.setItem(this.TODOS_STORAGE_KEY, JSON.stringify(todos));
    this.todosSubject.next(todos);
  }

  saveFilter(filter: TodoFilter): void {
    localStorage.setItem(this.FILTER_STORAGE_KEY, filter);
    this.filterSubject.next(filter);
  }
}
