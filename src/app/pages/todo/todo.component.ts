import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
import { TodoService } from '../../core/services/todo.service';
import { ITodo } from '../../core/models/todo.model';
import { SlidePanelComponent } from '../../shared/ui/slide-panel/slide-panel.component';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TodoCardComponent, SlidePanelComponent, ReactiveFormsModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent implements OnInit {
  todoForm!: FormGroup;
  todos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  todoId: number | null = null;
  filterByStatus = '';
  addLocally = true;
  constructor(private todoService: TodoService, private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      status: new FormControl('OPEN', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.getAllTodos();
  }

  getAllTodos() {
    this.todoService.getAllTodo(this.filterByStatus).subscribe({
      next: (response) => {
        this.todos = response.data;
      },
    });
  }

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  onFilterByStatus(status: string) {
    this.filterByStatus = status;
    this.getAllTodos();
  }

  onSubmit() {
    if (this.todoForm.valid) {
      if (this.addLocally) {
        // Add the todo locally
        const newTodo: ITodo = {
          ...this.todoForm.value,
          id: Date.now() // Simulate a unique ID
        };
        this.todos.push(newTodo);
        this.onCloseSlidePanel();
      } else {
        // Existing logic for server-side addition
        if (this.todoId) {
          this.todoService.updateTodo(this.todoId, this.todoForm.value).subscribe({
            next: () => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
        } else {
          this.todoService.addTodo(this.todoForm.value).subscribe({
            next: () => {
              this.getAllTodos();
              this.onCloseSlidePanel();
            },
          });
        }
      }
    } else {
      this.todoForm.markAllAsTouched();
    }
  }

  onLoadTodoForm(item: ITodo) {
    // Adjusted to ensure this.todoId is either a number or null
    this.todoId = item.id !== undefined ? item.id : null;
    this.todoForm.patchValue({
      title: item.title,
      description: item.description,
      status: item.status,
    });
    this.openSlidePanel();
  }

  onDeleteTodo(todoToDelete: ITodo): void {
    // Implement deletion logic here, e.g., filtering out the deleted todo
    this.todos = this.todos.filter(todo => todo !== todoToDelete);
  }
}  
