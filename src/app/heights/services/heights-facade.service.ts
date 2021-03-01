import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Height, Pagination } from '../../shared/models';
import { HeightsFormDialogActions, HeightsPageActions } from '../actions';
import * as fromHeights from '../reducers';

@Injectable()
export class HeightsFacadeService {
  sort$: Observable<Sort>;
  pagination$: Observable<Pagination>;
  heights$: Observable<Height[]>;

  constructor(private store: Store<fromHeights.State>) {
    this.pagination$ = this.store.pipe(select(fromHeights.selectPagination));

    this.sort$ = this.store.pipe(select(fromHeights.selectSort));

    this.heights$ = this.store.pipe(select(fromHeights.selectAllHeights));
  }

  addHeight(): void {
    this.store.dispatch(HeightsPageActions.addHeight());
  }

  changePageHeights(pageIndex: number): void {
    this.store.dispatch(HeightsPageActions.changePageHeights({ pageIndex }));
  }

  createHeight(height: Height): void {
    this.store.dispatch(HeightsFormDialogActions.createHeight({ height }));
  }

  editHeight(height: Height): void {
    this.store.dispatch(HeightsPageActions.editHeight({ height }));
  }

  deleteHeight(id: number): void {
    this.store.dispatch(HeightsPageActions.deleteHeight({ id }));
  }

  loadHeights(): void {
    this.store.dispatch(HeightsPageActions.loadHeights());
  }

  sortWeights(sort: Sort): void {
    this.store.dispatch(HeightsPageActions.sortHeights({ sort }));
  }

  updateHeight(height: Height): void {
    this.store.dispatch(HeightsFormDialogActions.updateHeight({ height }));
  }
}
