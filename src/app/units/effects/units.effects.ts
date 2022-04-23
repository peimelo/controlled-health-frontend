import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { AuthActions } from '../../auth/actions';
import { MessageApiActions } from '../../core/actions';
import { UnitsService } from '../../core/services/units.service';
import { ErrorsService } from '../../shared/services/errors.service';
import {
  UnitFormDialogActions,
  UnitsActions,
  UnitsApiActions,
  UnitsGuardActions,
  UnitsPageActions,
} from '../actions';
import { UnitFormDialogPageComponent } from '../containers/unit-form-dialog-page/unit-form-dialog-page.component';
import { UnitsFacadeService } from '../services/units-facade.service';

@Injectable()
export class UnitsEffects {
  dialogRef: any;

  addUnit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitsPageActions.addUnit),
        tap(() => {
          this.dialogRef = this.dialog.open(UnitFormDialogPageComponent, {
            data: {},
          });
        })
      ),
    { dispatch: false }
  );

  createUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitFormDialogActions.createUnit),
      mergeMap(({ unit }) =>
        this.unitsService.create(unit).pipe(
          mergeMap(() => [
            UnitsApiActions.createUnitSuccess(),
            UnitsActions.unitFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  deleteUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitsPageActions.deleteUnit),
      mergeMap((action) =>
        this.unitsService.delete(action.id).pipe(
          mergeMap(() => [
            UnitsApiActions.deleteUnitSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  editUnit$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitsPageActions.editUnit),
        tap(({ unit }) => {
          this.dialogRef = this.dialog.open(UnitFormDialogPageComponent, {
            data: { unit },
          });
        })
      ),
    { dispatch: false }
  );

  loadUnits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UnitsGuardActions.loadUnits,
        UnitsPageActions.changePageUnits,
        UnitsPageActions.sortUnits,
        UnitsApiActions.createUnitSuccess,
        UnitsApiActions.deleteUnitSuccess,
        UnitsApiActions.updateUnitSuccess
      ),
      withLatestFrom(
        this.unitsFacadeService.pagination$,
        this.unitsFacadeService.sort$
      ),
      exhaustMap(([action, pagination, sort]) =>
        this.unitsService.getAll(pagination.currentPage, sort).pipe(
          map((unitResponse) =>
            UnitsApiActions.loadUnitsSuccess({ unitResponse })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateUnit$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UnitFormDialogActions.updateUnit),
      mergeMap((action) =>
        this.unitsService.update(action.unit).pipe(
          mergeMap(() => [
            UnitsApiActions.updateUnitSuccess(),
            UnitsActions.unitFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  unitFormDialogDismiss$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UnitsActions.unitFormDialogDismiss, AuthActions.logout),
        tap(() => {
          this.dialogRef.close();
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private dialog: MatDialog,
    private errorService: ErrorsService,
    private unitsFacadeService: UnitsFacadeService,
    private unitsService: UnitsService
  ) {}
}
