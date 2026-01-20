import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingService } from '../../services/loading/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf, MatProgressBarModule],
  templateUrl: './loading-component.html',
  styleUrl: './loading-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoadingComponent {
  loadingService = inject(LoadingService);

  autoMode = input<boolean>(true);
  mode = computed(() => this.loadingService.mode());
  progress = computed(() => this.loadingService.progress());
  show = computed(() => this.loadingService.show());
}
