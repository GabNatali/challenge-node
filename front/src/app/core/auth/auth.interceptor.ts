import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

export const AuthInterceptor = ( req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>=> {
    const authService = inject(AuthService);
    const token = authService.token();

    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    return next(authReq)
};
