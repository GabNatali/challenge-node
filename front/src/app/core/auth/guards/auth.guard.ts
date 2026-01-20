import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AuthService } from '../auth.service';

export const AuthGuard: CanActivateFn | CanActivateChildFn = (route, state) => {
    const router: Router = inject(Router);

    return inject(AuthService)
      .check()
      .pipe(
          switchMap((authenticated) => {
              if (!authenticated) {
                const redirectURL =state.url === '/sign-in' ? '' : `redirectURL=${state.url}`;
                const urlTree = router.parseUrl(`sign-in?${redirectURL}`);
                return of(urlTree);
              }
                return of(true);
            })
        );
};
