import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'tasks',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet></router-outlet>'`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksComponent { }
