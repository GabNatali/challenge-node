import { DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { Task } from '../tasks.type';
import { TasksService } from '../tasks.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tasks-list',
  standalone: true,
  imports: [MatSidenavModule, RouterOutlet, NgIf, MatButtonModule, MatTooltipModule, MatIconModule, NgFor, NgClass, RouterLink, DatePipe],
  templateUrl: './list-component.html',
  styleUrl: './list-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksListComponent {

    @ViewChild('matDrawer', { static: true }) matDrawer!: MatDrawer;

    private readonly _router = inject(Router);
    private readonly _activatedRoute = inject(ActivatedRoute);
    private readonly _tasksService = inject(TasksService);
    private _breakpointObserver = inject(BreakpointObserver);
    private readonly _snackBar = inject(MatSnackBar);

    tasks = this._tasksService.tasks;
    selectedTask = this._tasksService.task;

    drawerMode = toSignal(
      this._breakpointObserver
        .observe([Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge])
        .pipe(
          map(result => result.matches ? 'side' : 'over')
        ),
      { initialValue: 'over' }
    );

    onBackdropClicked(): void{
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});
    }

    createTask(): void{
        this._router.navigate(['new'], {relativeTo: this._activatedRoute});
    }

    toggleCompleted(task: Task): void{
        this._tasksService.markTaskAsCompleted(task.id, task.status === 'PENDING' ? 'DONE' : 'PENDING').subscribe({
            next: (task) => {
                const message = task.status === 'PENDING' ? 'Task marked as PENDING' : 'Task marked as DONE';
                this._snackBar.open(message, 'Close', { duration: 3000});
            },
            error: (error) => this._snackBar.open(error?.message ?? 'Error updating task', 'Close', { duration: 3000})
        })
    }
}


