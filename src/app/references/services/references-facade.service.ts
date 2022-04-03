import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination, Reference } from '../../core/models';
import {
  ReferenceFormDialogActions,
  ReferencesGuardActions,
  ReferencesPageActions,
} from '../actions';
import * as fromReferences from '../reducers';

@Injectable()
export class ReferencesFacadeService {
  references$: Observable<Reference[]>;
  pagination$: Observable<Pagination>;
  selectListLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromReferences.State>) {
    this.references$ = this.store.pipe(select(fromReferences.selectList));
    this.pagination$ = this.store.pipe(select(fromReferences.selectPagination));
    this.selectListLoaded$ = this.store.pipe(
      select(fromReferences.selectListLoaded)
    );
    this.sort$ = this.store.pipe(select(fromReferences.selectSort));
  }

  add(): void {
    this.store.dispatch(ReferencesPageActions.addReference());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(ReferencesPageActions.changePageReferences({ pageIndex }));
  }

  create(reference: Reference): void {
    this.store.dispatch(ReferenceFormDialogActions.createReference({ reference }));
  }

  delete(id: number): void {
    this.store.dispatch(ReferencesPageActions.deleteReference({ id }));
  }

  edit(reference: Reference): void {
    this.store.dispatch(ReferencesPageActions.editReference({ reference }));
  }

  load(): void {
    this.store.dispatch(ReferencesGuardActions.loadReferences());
  }

  sort(sort: Sort): void {
    this.store.dispatch(ReferencesPageActions.sortReferences({ sort }));
  }

  update(reference: Reference): void {
    this.store.dispatch(ReferenceFormDialogActions.updateReference({ reference }));
  }
}
