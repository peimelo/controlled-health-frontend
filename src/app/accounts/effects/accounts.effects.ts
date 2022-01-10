import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { catchError, exhaustMap, map, mergeMap } from 'rxjs/operators';
import { MessageApiActions } from '../../core/actions';
import { ErrorsService } from '../../shared/services/errors.service';
import {
  AccountFormDialogPageActions,
  AccountsActions,
  AccountsApiActions,
  AccountsGuardActions,
  AccountsPageActions,
} from '../actions';
import { AccountFormDialogPageComponent } from '../containers/account-form-dialog-page/account-form-dialog-page.component';
import { AccountsService } from '../services/accounts.service';

@Injectable()
export class AccountsEffects {
  dialogRef: any;

  addAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountsPageActions.addAccount),
        tap(() => {
          this.dialogRef = this.dialog.open(AccountFormDialogPageComponent, {
            data: {},
          });
        })
      ),
    { dispatch: false }
  );

  createAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountFormDialogPageActions.createAccount),
      mergeMap(({ account }) =>
        this.accountsService.create(account).pipe(
          mergeMap(() => [
            AccountsApiActions.createAccountSuccess(),
            AccountsActions.accountFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  editAccount$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountsPageActions.editAccount),
        tap(({ account }) => {
          this.dialogRef = this.dialog.open(AccountFormDialogPageComponent, {
            data: { account },
          });
        })
      ),
    { dispatch: false }
  );

  formDialogDismiss$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountsActions.accountFormDialogDismiss),
        tap(() => {
          this.dialogRef.close();
        })
      ),
    { dispatch: false }
  );

  loadAccountFromPage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsPageActions.loadAccount),
      map((action) => action.account),
      map((account) => AccountsActions.loadAccountFromPageSuccess({ account })),
      tap(() => this.router.navigate(['/dashboard']))
    )
  );

  loadAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountsGuardActions.loadAccount),
      mergeMap((action) =>
        this.accountsService.getOne(action.id).pipe(
          map((account) => AccountsApiActions.loadAccountSuccess({ account })),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  loadAccountSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AccountsApiActions.loadAccountSuccess),
        map((action) => action.account),
        tap((account) => {
          localStorage.setItem('account', account.id.toString());
        })
      ),
    { dispatch: false }
  );

  loadAccounts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AccountsGuardActions.loadAccounts,
        AccountsApiActions.createAccountSuccess,
        AccountsApiActions.updateAccountSuccess
      ),
      exhaustMap(() =>
        this.accountsService.getAll().pipe(
          map((accountResponse) =>
            AccountsApiActions.loadAccountsSuccess({ accountResponse })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AccountFormDialogPageActions.updateAccount),
      mergeMap((action) =>
        this.accountsService.update(action.account).pipe(
          mergeMap(() => [
            AccountsApiActions.updateAccountSuccess(),
            AccountsActions.accountFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private accountsService: AccountsService,
    private router: Router
  ) {}
}
