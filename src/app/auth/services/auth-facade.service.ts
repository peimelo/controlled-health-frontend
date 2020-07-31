import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthActions, LoginPageActions } from '../actions';
import { Credentials } from '../models';
import * as fromAuth from '../reducers';

@Injectable({ providedIn: 'root' })
export class AuthFacadeService {
  errors$: Observable<string[]>;
  loggedIn$: Observable<boolean>;
  pending$: Observable<boolean>;
  user$: Observable<any>;

  constructor(private store: Store<fromAuth.State>) {
    this.errors$ = this.store.pipe(select(fromAuth.selectLoginPageError));

    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));

    this.pending$ = this.store.pipe(select(fromAuth.selectLoginPagePending));

    this.user$ = this.store.pipe(select(fromAuth.selectUser));
  }

  login(credentials: Credentials): void {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
