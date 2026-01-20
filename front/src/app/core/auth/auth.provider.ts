import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { AuthService } from './auth.service';
import { AuthInterceptor } from './auth.interceptor';

export const provideAuth = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideHttpClient(withInterceptors([AuthInterceptor])),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(AuthService),
            multi   : true,
        },
    ];
};
