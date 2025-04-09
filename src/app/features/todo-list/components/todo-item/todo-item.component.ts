import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../todo.types';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  /** The todo item to display */
  @Input() todo!: Todo;

  /** Event emitted when the todo's completion status is toggled */
  @Output() toggle = new EventEmitter<Todo>();

  /** Event emitted when the todo is requested to be deleted */
  @Output() delete = new EventEmitter<Todo>();

  /**
   * Handles the toggle action for the todo item
   * Emits the current todo to the parent component
   */
  onToggle(): void {
    this.toggle.emit(this.todo);
  }

  /**
   * Handles the delete action for the todo item
   * Emits the current todo to the parent component
   */
  onDelete(): void {
    this.delete.emit(this.todo);
  }
}
