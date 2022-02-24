import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Height, Pagination } from '../../core/models';
import {
  HeightFormDialogActions,
  HeightsGuardActions,
  HeightsPageActions,
} from '../actions';
import * as fromHeights from '../reducers';

@Injectable()
export class HeightsFacadeService {
  heights$: Observable<Height[]>;
  pagination$: Observable<Pagination>;
  selectListLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromHeights.State>) {
    this.heights$ = this.store.pipe(select(fromHeights.selectList));
    this.pagination$ = this.store.pipe(select(fromHeights.selectPagination));
    this.selectListLoaded$ = this.store.pipe(
      select(fromHeights.selectListLoaded)
    );
    this.sort$ = this.store.pipe(select(fromHeights.selectSort));
  }

  add(): void {
    this.store.dispatch(HeightsPageActions.addHeight());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(HeightsPageActions.changePageHeights({ pageIndex }));
  }

  create(height: Height): void {
    this.store.dispatch(HeightFormDialogActions.createHeight({ height }));
  }

  delete(id: number): void {
    this.store.dispatch(HeightsPageActions.deleteHeight({ id }));
  }

  edit(height: Height): void {
    this.store.dispatch(HeightsPageActions.editHeight({ height }));
  }

  load(): void {
    this.store.dispatch(HeightsGuardActions.loadHeights());
  }

  sort(sort: Sort): void {
    this.store.dispatch(HeightsPageActions.sortHeights({ sort }));
  }

  update(height: Height): void {
    this.store.dispatch(HeightFormDialogActions.updateHeight({ height }));
  }
}
