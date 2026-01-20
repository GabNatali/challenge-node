import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, computed, effect, inject, signal} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'user',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, NgIf, MatIconModule, NgClass, MatDividerModule, JsonPipe],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  private readonly authService = inject(AuthService);
  private readonly _router = inject(Router);

  user = computed(() => this.authService.user());
  logout() {
    this.authService.logout();
    this._router.navigate(['/sign-in']);
  }
}
