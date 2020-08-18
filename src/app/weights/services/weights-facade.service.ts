import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { WeightsPageActions } from '../actions';
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

  // changePage() {
  //                this.store.dispatch(
  //                  WeightsActions.loadWeights({
  //                    pageIndex: event.pageIndex + 1,
  //                  })
  //                );
  //              }

  loadWeights(pageIndex: number): void {
    this.store.dispatch(WeightsPageActions.loadWeights({ pageIndex }));
  }
}
