import { computed, inject } from '@angular/core';
import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoadingService } from './loading.service';


export const LoadingInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
    const loadingService = inject(LoadingService);

    const handleRequestsAutomatically = computed(() => loadingService.auto());

    if (!handleRequestsAutomatically()) return next(req);

    loadingService._setLoadingStatus(true, req.url);

    return next(req).pipe(
      finalize(() => loadingService._setLoadingStatus(false, req.url)));
};
