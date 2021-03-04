import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models';
import { ResultsFormDialogActions, ResultsPageActions } from '../actions';
import { Result } from '../models';
import * as fromResults from '../reducers';

@Injectable()
export class ResultsFacadeService {
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;
  results$: Observable<Result[]>;

  constructor(private store: Store<fromResults.State>) {
    this.pagination$ = this.store.pipe(select(fromResults.selectPagination));

    this.sort$ = this.store.pipe(select(fromResults.selectSort));

    this.results$ = this.store.pipe(select(fromResults.selectAllResults));
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

  sortResults(sort: Sort): void {
    this.store.dispatch(ResultsPageActions.sortResults({ sort }));
  }

  updateResult(result: Result): void {
    this.store.dispatch(ResultsFormDialogActions.updateResult({ result }));
  }
}
