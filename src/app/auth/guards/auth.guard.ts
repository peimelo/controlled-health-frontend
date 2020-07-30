import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';
import { AuthActions } from '../store/actions';
import * as fromAuth from '../store/reducers';
import * as fromAuthSelectors from '../store/selectors';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.isUserLoggedIn();
  }

  isUserLoggedIn(): Observable<boolean> {
    return this.store.select(fromAuthSelectors.getLoggedIn).pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this.store.dispatch(AuthActions.loadUser());
        }
      }),
      filter(loggedIn => loggedIn),
      take(1)
    );
  }
}
