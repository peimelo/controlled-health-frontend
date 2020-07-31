import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AuthActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isUserLoggedIn();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.store.select(fromAuth.selectLoggedIn).pipe(
      tap((loggedIn) => {
        if (!loggedIn) {
          this.store.dispatch(AuthActions.loadUser());
        }
      }),
      filter((loggedIn) => loggedIn),
      take(1)
    );
  }
}
