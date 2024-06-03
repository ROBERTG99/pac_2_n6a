import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodosService } from '../todos.service';

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.scss'],
})
export class TodoDetailComponent implements OnInit {
  todo: Todo | undefined;
  apiError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private todosService: TodosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.todosService.getTodoById(id).subscribe(
      (todo) => {
        this.todo = todo;
        this.apiError = false;
      },
      (error) => {
        console.error('Error fetching todo:', error);
        this.apiError = true;
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/todos']);
  }
}
