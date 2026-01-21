import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { TasksService } from './tasks.service';
import { TasksComponent } from './tasks-component';
import { TasksDetailsComponent } from './details/details-component';
import { TasksListComponent } from './list/list-component';


const taskResolver = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const tasksService = inject(TasksService);
  const router = inject(Router);

  const id = route.paramMap.get('id');

  if (!id) {
    tasksService.clearSelectedTask();
    return null;
  }

  return tasksService.getTaskById(id).pipe(
    catchError((error) => {
      const parentUrl = state.url.split('/').slice(0, -1).join('/');
      router.navigateByUrl(parentUrl);

      return throwError(() => error);
    })
  );
};


const canDeactivateTasksDetails = (
  component: TasksDetailsComponent,
  currentRoute: ActivatedRouteSnapshot,
  currentState: RouterStateSnapshot,
  nextState: RouterStateSnapshot
) => {
  if (
    currentState.url === '/tasks/new' &&
    nextState.url !== '/tasks'
  ) {
    return true;
  }

  let nextRoute = nextState.root;
  while (nextRoute.firstChild) {
    nextRoute = nextRoute.firstChild;
  }

  if (nextRoute.paramMap.get('id')) {
    return true;
  }

  if (!nextState.url.startsWith('/tasks')) {
    return true;
  }

  return component.closeDrawer().then(()=> true)

};


export default [
  {
    path: '',
    component: TasksComponent,
    children: [
      {
        path: '',
        component: TasksListComponent,
        resolve: {
          tasks: () => inject(TasksService).getTasks(),
        },
        children: [
          {
            path: 'new',
            component: TasksDetailsComponent,
            resolve: {task: taskResolver},
            canDeactivate: [canDeactivateTasksDetails],
          },
          {
            path: ':id',
            component: TasksDetailsComponent,
            resolve: {task: taskResolver},
            canDeactivate: [canDeactivateTasksDetails],
          },
        ],
      },
    ],
  },
] as Routes;
