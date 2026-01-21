import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { LoadingComponent } from '../../../shared/components/loading-component/loading-component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports : [NgOptimizedImage, NgIf, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, LoadingComponent,],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {

  private readonly _authService = inject(AuthService)
  private readonly _router = inject(Router)
  private readonly _activatedRoute = inject(ActivatedRoute)
  private readonly _fb = inject(FormBuilder)
  private _matDialog: MatDialog = inject(MatDialog);

  authErrorMessage = signal('');
  signInForm: FormGroup = this._fb.group({
    email: ['', [Validators.required, Validators.email]],
  })


  signIn(): void {
    if (this.signInForm.invalid) return;

    this.authErrorMessage.set('');

    const { email } = this.signInForm.value;

    this._authService.signIn(email).subscribe({
      next: () => this.redirectAfterLogin(),
      error: (err) => this.handleSignInError(err, email),
    });
  }

  private handleSignInError(err: any, email: string): void {
    if (err.status === 404) {
      this.askForRegistration(email);
      return;
    }

    this.authErrorMessage.set(err.error?.message || 'Internal server error');
  }
  private askForRegistration(email: string): void {
    const dialogRef = this._matDialog.open(DialogComponent, {
      autoFocus: false,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirmed') {
          this.registerAndRedirect(email);
        }
      });
  }

  private registerAndRedirect(email: string): void {
    this._authService.register(email).subscribe({
      next: () => this.redirectAfterLogin(),
      error: (err) => {
        this.authErrorMessage.set(
          err.error?.message || 'Internal server error'
        );
      },
    });
  }

  private redirectAfterLogin(): void {
    const redirectURL =
      this._activatedRoute.snapshot.queryParamMap.get('redirectURL') ||
      '/';

    this._router.navigateByUrl(redirectURL);
  }
}
