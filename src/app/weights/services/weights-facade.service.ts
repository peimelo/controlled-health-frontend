import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination, Weight } from '../../shared/models';
import { WeightsFormDialogActions, WeightsPageActions } from '../actions';
import * as fromWeights from '../reducers';

@Injectable()
export class WeightsFacadeService {
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;
  weights$: Observable<Weight[]>;

  constructor(private store: Store<fromWeights.State>) {
    this.pagination$ = this.store.pipe(select(fromWeights.selectPagination));
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
    this.store.dispatch(WeightsFormDialogActions.createWeight({ weight }));
  }

  delete(id: number): void {
    this.store.dispatch(WeightsPageActions.deleteWeight({ id }));
  }

  edit(weight: Weight): void {
    this.store.dispatch(WeightsPageActions.editWeight({ weight }));
  }

  load(): void {
    this.store.dispatch(WeightsPageActions.loadWeights());
  }

  sort(sort: Sort): void {
    this.store.dispatch(WeightsPageActions.sortWeights({ sort }));
  }

  update(weight: Weight): void {
    this.store.dispatch(WeightsFormDialogActions.updateWeight({ weight }));
  }
}
