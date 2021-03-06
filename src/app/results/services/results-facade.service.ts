import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models';
import {
  ResultDetailPageActions,
  ResultsFormDialogActions,
  ResultsPageActions,
} from '../actions';
import { Result } from '../models';
import * as fromResults from '../reducers';

@Injectable()
export class ResultsFacadeService {
  pagination$: Observable<Pagination>;
  results$: Observable<Result[]>;
  selected$: Observable<Result>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromResults.State>) {
    this.pagination$ = this.store.pipe(select(fromResults.selectPagination));

    this.results$ = this.store.pipe(select(fromResults.selectAllResults));

    this.selected$ = this.store.pipe(select(fromResults.selectSelected));

    this.sort$ = this.store.pipe(select(fromResults.selectSort));
  }

  addResult(): void {
    this.store.dispatch(ResultsPageActions.addResult());
  }

  changePageResults(pageIndex: number): void {
    this.store.dispatch(ResultsPageActions.changePageResults({ pageIndex }));
  }

  createResult(result: Result): void {
    this.store.dispatch(ResultsFormDialogActions.createResult({ result }));
  }

  editResult(result: Result): void {
    this.store.dispatch(ResultsPageActions.editResult({ result }));
  }

  deleteResult(id: number): void {
    this.store.dispatch(ResultsPageActions.deleteResult({ id }));
  }

  loadResults(): void {
    this.store.dispatch(ResultsPageActions.loadResults());
  }

  loadResult(id: number): void {
    this.store.dispatch(ResultDetailPageActions.loadResult({ id }));
  }

  sortResults(sort: Sort): void {
    this.store.dispatch(ResultsPageActions.sortResults({ sort }));
  }

  updateResult(result: Result): void {
    this.store.dispatch(ResultsFormDialogActions.updateResult({ result }));
  }
}
