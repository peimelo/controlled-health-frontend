import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Weight } from '../../core/models';
import { Pagination } from '../../shared/models';
import {
  WeightFormDialogActions,
  WeightsGuardActions,
  WeightsPageActions,
} from '../actions';
import * as fromWeights from '../reducers';

@Injectable()
export class WeightsFacadeService {
  pagination$: Observable<Pagination>;
  selectListLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;
  weights$: Observable<Weight[]>;

  constructor(private store: Store<fromWeights.State>) {
    this.pagination$ = this.store.pipe(select(fromWeights.selectPagination));
    this.selectListLoaded$ = this.store.pipe(
      select(fromWeights.selectListLoaded)
    );
    this.sort$ = this.store.pipe(select(fromWeights.selectSort));
    this.weights$ = this.store.pipe(select(fromWeights.selectAllWeights));
  }

  add(): void {
    this.store.dispatch(WeightsPageActions.addWeight());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(WeightsPageActions.changePageWeights({ pageIndex }));
  }

  create(weight: Weight): void {
    this.store.dispatch(WeightFormDialogActions.createWeight({ weight }));
  }

  delete(id: number): void {
    this.store.dispatch(WeightsPageActions.deleteWeight({ id }));
  }

  edit(weight: Weight): void {
    this.store.dispatch(WeightsPageActions.editWeight({ weight }));
  }

  load(): void {
    this.store.dispatch(WeightsGuardActions.loadWeights());
  }

  sort(sort: Sort): void {
    this.store.dispatch(WeightsPageActions.sortWeights({ sort }));
  }

  update(weight: Weight): void {
    this.store.dispatch(WeightFormDialogActions.updateWeight({ weight }));
  }
}
