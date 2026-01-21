import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Task, TaskEditable } from './tasks.type';
import { Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly _http = inject(HttpClient);

  private _tasks = signal<Task[]>([]);
  private _task = signal<Task | null>(null);


  tasks = this._tasks.asReadonly();
  task = this._task.asReadonly();

  setTasks(tasks: Task[]) {
    this._tasks.set(tasks);
  }

  setTask(task: Task | null) {
    this._task.set(task);
  }

  getTasks(): Observable<Task[]>{
    return this._http.get<Task[]>(`${API_URL}/tasks`).pipe(
      tap(tasks => this._tasks.set(tasks))
    );
  }

  getTaskById(id: string): Observable<Task> {
    return this._http.get<Task>(`${API_URL}/tasks/${id}`).pipe(
      tap(task => this._task.set(task))
    );
  }

  createTask(task: TaskEditable): Observable<Task> {
    return this._http.post<Task>(`${API_URL}/tasks`, task).pipe(
      tap((createdTask) => {
        this._tasks.update(tasks => [createdTask,...tasks]);
        this._task.set(createdTask);
      })
    );
  }
  updateTask(id: string, task:Partial<TaskEditable>): Observable<Task> {
    return this._http.patch<Task>(`${API_URL}/tasks/${id}`, task).pipe(
      tap(updatedTask => {
        this._tasks.update(tasks =>
          tasks.map(t => (t.id === id ? updatedTask : t))
        );
        this._task.set(updatedTask);
      })
    );
  }

  deleteTask(id: string): Observable<boolean> {
    return this._http.delete<boolean>(`${API_URL}/tasks/${id}`).pipe(
      tap((response) => {
        this._tasks.update(tasks => tasks.filter(t => t.id !== id));
        if (this._task()?.id === id) this._task.set(null);
      })
    );
  }

  markTaskAsCompleted(id: string , status:string): Observable<Task> {
    return this._http.patch<Task>(`${API_URL}/tasks/${id}/status`, {status}).pipe(
      tap(updatedTask => {
        this._tasks.update(tasks =>
          tasks.map(t => (t.id === id ? updatedTask : t))
        );
        this._task.set(updatedTask);
      })
    );
  }

  clearSelectedTask(): void {
    this._task.set(null);
  }

}
