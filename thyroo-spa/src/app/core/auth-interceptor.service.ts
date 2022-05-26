import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(
        private authenticationService: AuthenticationService) { }

    intercept(httpRequest: HttpRequest<any>, nextHttpHandler: HttpHandler): Observable<HttpEvent<any>> {
        httpRequest = httpRequest.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authenticationService.getToken()}`
            }
        });
        return nextHttpHandler.handle(httpRequest);
    }
}
