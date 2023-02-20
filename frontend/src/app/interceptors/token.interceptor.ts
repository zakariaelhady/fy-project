import { Injectable } from '@angular/core';
import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {  catchError, Observable, of, tap, throwError } from 'rxjs';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(public auth: AuthService,private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken();
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
        return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        
        if (err.status === 401 || err.status === 403) {
            this.auth.deleteSession();
            localStorage.removeItem("keycloak_refresh_token");
            this.router.navigate(['/login']);
            
            return of(err.message);
        }
        return throwError(()=>err);
    }
}