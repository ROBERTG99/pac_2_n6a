import { Component, OnInit } from '@angular/core';
import { TodosService } from '../todos.service';
import { Router } from '@angular/router';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  todos: Todo[] = [];
  filteredTodos: Todo[] = [];
  searchQuery: string = '';
  noResults: boolean = false;
  searchInitiated: boolean = false;
  apiError: boolean = false;

  constructor(private todosService: TodosService, private router: Router) {}

  ngOnInit(): void {
    this.todosService.getTodos().subscribe(
      (todos) => {
        this.todos = todos;
        this.apiError = false;
      },
      (error) => {
        console.error('Error fetching todos:', error);
        this.apiError = true;
      }
    );
  }

  onSearch(): void {
    this.searchInitiated = true;
    if (this.searchQuery.trim() === '') {
      this.filteredTodos = [];
      this.noResults = true;
    } else {
      this.filteredTodos = this.todos.filter((todo) =>
        todo.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      this.noResults = this.filteredTodos.length === 0;
    }
  }

  viewDetails(todoId: number): void {
    this.router.navigate(['/todos', todoId]);
  }
}
