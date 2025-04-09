import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Todo, TodoFilter } from '../../todo.types';

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

  ngOnInit() {
    this.subscription.add(
      this.filterSubject$.subscribe(filter => {
        this.currentFilter = filter;
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
      this.todosSubject$.next([...currentTodos, newTodo]);
      this.newTodo = '';
    }
  }

  setFilter(filter: TodoFilter) {
    this.filterSubject$.next(filter);
  }

  onToggleTodo(todoId: number) {
    const currentTodos = this.todosSubject$.value;
    const updatedTodos = currentTodos.map(todo =>
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    this.todosSubject$.next(updatedTodos);
  }

  onDeleteTodo(todoId: number) {
    const currentTodos = this.todosSubject$.value;
    const updatedTodos = currentTodos.filter(todo => todo.id !== todoId);
    this.todosSubject$.next(updatedTodos);
  }
}
