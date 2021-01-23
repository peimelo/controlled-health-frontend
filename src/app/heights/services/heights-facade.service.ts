import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Height, Pagination } from '../../shared/models';
import {
  HeightsActions,
  HeightsFormDialogActions,
  HeightsPageActions,
} from '../actions';
import * as fromHeights from '../reducers';

@Injectable()
export class HeightsFacadeService {
  selectListLoaded$: Observable<boolean>;
  pagination$: Observable<Pagination>;
  heights$: Observable<Height[]>;

  constructor(private store: Store<fromHeights.State>) {
    this.selectListLoaded$ = this.store.pipe(
      select(fromHeights.selectListLoaded)
    );

    this.pagination$ = this.store.pipe(select(fromHeights.selectPagination));

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

  loadHeights(pageIndex: number): void {
    this.store.dispatch(HeightsActions.loadHeights({ pageIndex }));
  }

  updateHeight(height: Height): void {
    this.store.dispatch(HeightsFormDialogActions.updateHeight({ height }));
  }
}
