import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

type FilterType = 'all' | 'completed' | 'incomplete';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: string = '';

  private filterSubject$ = new BehaviorSubject<FilterType>('all');
  private todosSubject$ = new BehaviorSubject<Todo[]>(this.todos);

  filteredTodos$ = combineLatest([
    this.todosSubject$,
    this.filterSubject$
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

  ngOnInit() {
    this.todosSubject$.next(this.todos);
  }

  addTodo(title: string = this.newTodo): void {
    if (title.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: title,
        completed: false
      };
      this.todos.push(todo);
      this.newTodo = '';
      this.todosSubject$.next(this.todos);
    }
  }

  toggleTodo(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todosSubject$.next(this.todos);
  }

  deleteTodo(todo: Todo): void {
    this.todos = this.todos.filter(t => t.id !== todo.id);
    this.todosSubject$.next(this.todos);
  }

  setFilter(filter: FilterType): void {
    this.filterSubject$.next(filter);
  }
}
