import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Credentials } from '../models';
import { AuthActions, LoginPageActions } from '../store/actions';
import * as fromAuth from '../store/reducers';
import * as fromSelectors from '../store/selectors';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  errorMessages$: Observable<string[]>;
  loggedIn$: Observable<boolean>;
  user$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.errorMessages$ = this.store.pipe(
      select(fromSelectors.getErrorMessages)
    );

    this.loggedIn$ = this.store.pipe(select(fromSelectors.getLoggedIn));
  }

  login(credentials: Credentials): void {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
