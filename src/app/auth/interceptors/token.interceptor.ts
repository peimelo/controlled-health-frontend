import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private authService: AuthService;

  constructor(private injector: Injector) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);

    const accessToken = this.authService.getValueFromLocalStorage(
      'access-token'
    );
    const client = this.authService.getValueFromLocalStorage('client');
    const uid = this.authService.getValueFromLocalStorage('uid');

    if (accessToken && client && uid) {
      request = request.clone({
        setHeaders: {
          'access-token': accessToken,
          client,
          uid,
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(request);
  }
}
