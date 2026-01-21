import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, inject, OnInit } from '@angular/core';
import { TasksListComponent } from '../list/list-component';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatRippleModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { MatTooltipModule } from "@angular/material/tooltip";
import { TasksService } from '../tasks.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Task, TaskEditable } from '../tasks.type';

@Component({
  selector: 'tasks-details',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf,
    MatIconModule,
    MatMenuModule,
    RouterLink,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    NgFor,
    MatRippleModule,
    MatCheckboxModule,
    NgClass,
    MatTooltipModule
],
  templateUrl: './details-component.html',
  styleUrl: './details-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksDetailsComponent implements OnInit{

  private readonly _tasksListComponent = inject(TasksListComponent);
  private readonly _fb = inject(FormBuilder)
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _router = inject(Router);
  private readonly _tasksService = inject(TasksService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  task = this._tasksService.task;
  isNew = computed(() => !this.task());
  isEdit = computed(() => !!this.task());

  markAsCompleted = computed(() => this.task()?.status === 'PENDING');
  taskForm: FormGroup = this._fb.group({
    title: ['', [Validators.required, Validators.maxLength(120) , Validators.minLength(5)]],
    description: ['', Validators.maxLength(256)],
  });

  setTask = effect(() => {
    const task = this.task();
    if (!task) {
      this.taskForm.reset();
      return;
    };

    this.taskForm.patchValue(
      {
        title: this.task()?.title,
        description: this.task()?.description,
      }
    );
  })

  ngOnInit(): void {
    this._tasksListComponent.matDrawer.open();
  }

  toggleCompleted(): void{
    const task = this.task();
    if (!task) return;

    const status = this.markAsCompleted() ? 'DONE' : 'PENDING';

    this._tasksService.markTaskAsCompleted(task.id, status).subscribe({
      next: () => this._snackBar.open('Task updated successfully', 'Close', { duration: 3000 }),
      error: () => this._snackBar.open('Error updating task', 'Close', {duration: 3000})
    })

  }

  closeDrawer(): Promise<MatDrawerToggleResult> {
    return this._tasksListComponent.matDrawer.close();
  }
  openDrawer(): Promise<MatDrawerToggleResult> {
    return this._tasksListComponent.matDrawer.open();
  }

  deleteTask(): void{
    const task = this.task();
    if (!task) return;
    this._tasksService.deleteTask(task.id).subscribe({
      next: () => this.afterSave('Task deleted successfully'),
      error: () => this._snackBar.open('Error deleting task', 'Close', {duration: 3000})
    });
  }
  saveTask(){
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }
    const payload = this.getCurrentFormValue();
    this.isNew() ? this.createTask(payload) : this.updateTask(payload);
  }

  createTask(payload: TaskEditable){
    this._tasksService.createTask(payload).subscribe({
      next:async () => this.afterSave('Task created successfully'),
      error: () => this._snackBar.open('Error creating task', 'Close', { duration: 3000})
    })
  }


  updateTask(payload: TaskEditable): void {
    const task = this.task();
    if (!task) return;
    const updateData = this.buildUpdatePayload(task, payload);
    if (Object.keys(updateData).length === 0) {
      this._snackBar.open('No changes detected', 'Close', {
        duration: 3000,
      });
      return;
    }

    this._tasksService.updateTask(task.id, updateData).subscribe({
      next: () => this._snackBar.open('Task updated successfully', 'Close', { duration: 3000 }),
      error: () => this._snackBar.open('Error updating task', 'Close', {duration: 3000})
    })
  }

  private buildUpdatePayload( original: Task, current: TaskEditable): Partial<TaskEditable> {
    const diff: Partial<TaskEditable> = {} ;

    (Object.keys(current) as (keyof TaskEditable)[]).forEach(key => {
      if (current[key] !== original[key]) {
        diff[key] = current[key];
      }
    });

    return diff;
  }

  private afterSave(message: string): void {
    this._snackBar.open(message, 'Close', { duration: 3000 });
    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
    this._changeDetectorRef.markForCheck();
  }

  private getCurrentFormValue(): TaskEditable {
    return {
      title: this.taskForm.value.title?.trim() ?? '',
      description: this.taskForm.value.description?.trim() ?? ''
    };
  }
}
