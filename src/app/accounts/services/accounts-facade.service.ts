import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  AccountFormDialogPageActions,
  AccountsGuardActions,
  AccountsPageActions,
} from '../actions';
import { Account } from '../models';
import * as fromAccounts from '../reducers';

@Injectable({ providedIn: 'root' })
export class AccountsFacadeService {
  accounts$: Observable<Account[]>;
  selectListLoaded$: Observable<boolean>;
  selected$: Observable<Account | null>;
  selectedLoaded$: Observable<boolean>;

  constructor(private store: Store<fromAccounts.State>) {
    this.accounts$ = this.store.pipe(select(fromAccounts.selectAllAccounts));
    this.selectListLoaded$ = this.store.pipe(
      select(fromAccounts.selectListLoaded)
    );
    this.selected$ = this.store.pipe(select(fromAccounts.selectSelected));
    this.selectedLoaded$ = this.store.pipe(
      select(fromAccounts.selectSelectedLoaded)
    );
  }

  add(): void {
    this.store.dispatch(AccountsPageActions.addAccount());
  }

  create(account: Account): void {
    this.store.dispatch(
      AccountFormDialogPageActions.createAccount({ account })
    );
  }

  edit(account: Account): void {
    this.store.dispatch(AccountsPageActions.editAccount({ account }));
  }

  load(): void {
    this.store.dispatch(AccountsGuardActions.loadAccounts());
  }

  loadAccount(id: number): void {
    this.store.dispatch(AccountsGuardActions.loadAccount({ id }));
  }

  loadAccountFromPage(account: Account): void {
    this.store.dispatch(AccountsPageActions.loadAccount({ account }));
  }

  update(account: Account): void {
    this.store.dispatch(
      AccountFormDialogPageActions.updateAccount({ account })
    );
  }
}
