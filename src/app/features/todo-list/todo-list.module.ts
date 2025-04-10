import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';



@NgModule({
  declarations: [TodoListComponent, TodoItemComponent],
  imports: [
    CommonModule
  ]
})
export class TodoListModule { }
