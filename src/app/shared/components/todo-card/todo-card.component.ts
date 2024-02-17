import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ITodo } from '../../../core/models/todo.model';

export type ITodoType = 'OPEN' | 'PROGRESS' | 'TESTING' | 'DONE';
export const ITodoStatus = ['OPEN', 'PROGRESS', 'TESTING', 'DONE'];

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
})
export class TodoCardComponent {
  @Input() type: ITodoType = 'OPEN';
  @Input() todo!: ITodo;

  @Output() deleteTodo = new EventEmitter<ITodo>(); // Emit the todo to be deleted

  onDeleteTodo() {
    this.deleteTodo.emit(this.todo); // Emit the current todo
  }
  
}
