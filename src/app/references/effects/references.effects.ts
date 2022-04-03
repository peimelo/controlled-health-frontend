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
import { ErrorsService } from '../../shared/services/errors.service';
import {
  ReferenceFormDialogActions,
  ReferencesActions,
  ReferencesApiActions,
  ReferencesGuardActions,
  ReferencesPageActions,
} from '../actions';
import { ReferenceFormDialogPageComponent } from '../containers/reference-form-dialog-page/reference-form-dialog-page.component';
import { ReferencesFacadeService } from '../services/references-facade.service';
import { ReferencesService } from '../services/references.service';

@Injectable()
export class ReferencesEffects {
  dialogRef: any;

  addReference$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReferencesPageActions.addReference),
        tap(() => {
          this.dialogRef = this.dialog.open(ReferenceFormDialogPageComponent, {
            data: {},
          });
        })
      ),
    { dispatch: false }
  );

  createReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceFormDialogActions.createReference),
      mergeMap(({ reference }) =>
        this.referencesService.create(reference).pipe(
          mergeMap(() => [
            ReferencesApiActions.createReferenceSuccess(),
            ReferencesActions.referenceFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully created.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  deleteReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferencesPageActions.deleteReference),
      mergeMap((action) =>
        this.referencesService.delete(action.id).pipe(
          mergeMap(() => [
            ReferencesApiActions.deleteReferenceSuccess(),
            MessageApiActions.successMessage({
              message: 'Record successfully deleted.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  editReference$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReferencesPageActions.editReference),
        tap(({ reference }) => {
          this.dialogRef = this.dialog.open(ReferenceFormDialogPageComponent, {
            data: { reference },
          });
        })
      ),
    { dispatch: false }
  );

  loadReferences$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ReferencesGuardActions.loadReferences,
        ReferencesPageActions.changePageReferences,
        ReferencesPageActions.sortReferences,
        ReferencesApiActions.createReferenceSuccess,
        ReferencesApiActions.deleteReferenceSuccess,
        ReferencesApiActions.updateReferenceSuccess
      ),
      withLatestFrom(
        this.referencesFacadeService.pagination$,
        this.referencesFacadeService.sort$
      ),
      exhaustMap(([action, pagination, sort]) =>
        this.referencesService.getAll(pagination.currentPage, sort).pipe(
          map((referenceResponse) =>
            ReferencesApiActions.loadReferencesSuccess({ referenceResponse })
          ),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  updateReference$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ReferenceFormDialogActions.updateReference),
      mergeMap((action) =>
        this.referencesService.update(action.reference).pipe(
          mergeMap(() => [
            ReferencesApiActions.updateReferenceSuccess(),
            ReferencesActions.referenceFormDialogDismiss(),
            MessageApiActions.successMessage({
              message: 'Record successfully updated.',
            }),
          ]),
          catchError((error) => this.errorService.showError(error))
        )
      )
    )
  );

  referenceFormDialogDismiss$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ReferencesActions.referenceFormDialogDismiss, AuthActions.logout),
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
    private referencesFacadeService: ReferencesFacadeService,
    private referencesService: ReferencesService
  ) {}
}
