import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeightsFormDialogActions, WeightsPageActions } from '../actions';
import { Pagination, Weight } from '../models';
import * as fromWeights from '../reducers';

@Injectable()
export class WeightsFacadeService {
  selectListLoaded$: Observable<boolean>;
  pagination$: Observable<Pagination>;
  weights$: Observable<Weight[]>;

  constructor(private store: Store<fromWeights.State>) {
    this.selectListLoaded$ = this.store.pipe(
      select(fromWeights.selectListLoaded)
    );

    this.pagination$ = this.store.pipe(select(fromWeights.selectPagination));

    this.weights$ = this.store.pipe(select(fromWeights.selectAllWeights));
  }

  createWeight(weight: Weight): void {
    this.store.dispatch(WeightsFormDialogActions.createWeight({ weight }));
  }

  deleteWeight(id: number): void {
    this.store.dispatch(WeightsPageActions.deleteWeight({ id }));
  }

  loadWeights(pageIndex: number): void {
    this.store.dispatch(WeightsPageActions.loadWeights({ pageIndex }));
  }

  weightFormDialogOpen(): void {
    this.store.dispatch(WeightsPageActions.weightFormDialogOpen({}));
  }
}
