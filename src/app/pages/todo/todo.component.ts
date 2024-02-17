import { Component, OnInit } from '@angular/core';
import {
  ITodoStatus,
  TodoCardComponent,
} from '../../shared/components/todo-card/todo-card.component';
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
  allTodos: ITodo[] = [];
  todoStatus = ITodoStatus;
  isSlidePanelOpen = false;
  todoId: number | null = null;
  filterByStatus = '';
  addLocally = true;

  constructor(private fb: FormBuilder) {
    this.todoForm = this.fb.group({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      status: new FormControl('OPEN', Validators.required),
    });
  }

  ngOnInit(): void {
  }
  

  openSlidePanel() {
    this.isSlidePanelOpen = true;
  }

  onCloseSlidePanel() {
    this.isSlidePanelOpen = false;
  }

  onFilterByStatus(status: string) {
    console.log("Filtering by status:", status); // Debug log
    this.filterByStatus = status;
    if (status === '') {
      this.todos = [...this.allTodos];
    } else {
      this.todos = this.allTodos.filter(todo => todo.status === status);
    }
  }


  onSubmit() {
    if (this.todoForm.valid) {
      const newTodo: ITodo = {
        ...this.todoForm.value,
        id: Date.now(), // Simulate a unique ID
      };
      this.allTodos.push(newTodo); // Always add to the master list
      this.onFilterByStatus(this.filterByStatus); // Reapply the current filter
      this.todoForm.reset({ status: 'OPEN' }); // Reset the form for the next input
    } else {
      this.todoForm.markAllAsTouched();
    }

    this.onCloseSlidePanel();
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
    this.allTodos = this.allTodos.filter(todo => todo.id !== todoToDelete.id);
    this.onFilterByStatus(this.filterByStatus); // Reapply the current filter to update the displayed list
  }
}  
