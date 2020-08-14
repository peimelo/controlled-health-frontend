import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AuthFacadeService } from '../services/auth-facade.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authFacade: AuthFacadeService) {}

  canActivate(): Observable<boolean> {
    return this.isUserLoggedIn();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.authFacade.loggedIn$.pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.authFacade.loadUser();
        }
      }),
      filter((loggedIn) => loggedIn),
      take(1)
    );
  }
}
