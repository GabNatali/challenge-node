import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ENVIRONMENT_INITIALIZER, EnvironmentProviders, inject, Provider } from '@angular/core';
import { LoadingService } from './loading.service';
import { LoadingInterceptor } from './loading.interceptor';

export const provideLoading = (): Array<Provider | EnvironmentProviders> =>
{
    return [
        provideHttpClient(withInterceptors([LoadingInterceptor])),
        {
            provide : ENVIRONMENT_INITIALIZER,
            useValue: () => inject(LoadingService),
            multi   : true,
        },
    ];
};
