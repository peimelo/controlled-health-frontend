import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access-token');
    const client = localStorage.getItem('client');
    const uid = localStorage.getItem('uid');
    const account = localStorage.getItem('account') || '';

    if (accessToken && client && uid) {
      request = request.clone({
        setHeaders: {
          'access-token': accessToken,
          client,
          uid,
          account,
          'Content-Type': 'application/json',
        },
      });
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.setHeadersInLocalStorage(event.headers);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.setHeadersInLocalStorage(error.headers);
        return throwError(error);
      })
    );
  }

  private setHeadersInLocalStorage(headers: HttpHeaders): void {
    this.setItemInLocalStorage('access-token', headers.get('access-token'));
    this.setItemInLocalStorage('client', headers.get('client'));
    this.setItemInLocalStorage('uid', headers.get('uid'));
  }

  private setItemInLocalStorage(key: string, value: string | null) {
    if (value) {
      localStorage.setItem(key, value);
    }
  }
}
