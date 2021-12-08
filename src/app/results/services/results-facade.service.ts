import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models';
import {
  ResultDetailPageActions,
  ResultExistsGuardActions,
  ResultsGuardActions,
  ResultsPageActions,
} from '../actions';
import { Result } from '../models';
import * as fromResults from '../reducers';

@Injectable()
export class ResultsFacadeService {
  pagination$: Observable<Pagination>;
  results$: Observable<Result[]>;
  selected$: Observable<Result | null>;
  selectListLoaded$: Observable<boolean>;
  selectedLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromResults.State>) {
    this.pagination$ = this.store.pipe(select(fromResults.selectPagination));

    this.results$ = this.store.pipe(select(fromResults.selectAllResults));

    this.selected$ = this.store.pipe(select(fromResults.selectSelected));

    this.selectListLoaded$ = this.store.pipe(
      select(fromResults.selectListLoaded)
    );

    this.selectedLoaded$ = this.store.pipe(
      select(fromResults.selectSelectedLoaded)
    );

    this.sort$ = this.store.pipe(select(fromResults.selectSort));
  }

  add(): void {
    this.store.dispatch(ResultsPageActions.addResult());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(ResultsPageActions.changePageResults({ pageIndex }));
  }

  create(result: Result): void {
    // this.store.dispatch(ResultsPageActions.createResult({ result }));
  }

  delete(id: number): void {
    this.store.dispatch(ResultsPageActions.deleteResult({ id }));
  }

  edit(result: Result): void {
    this.store.dispatch(ResultsPageActions.editResult({ result }));
  }

  load(): void {
    this.store.dispatch(ResultsGuardActions.loadResults());
  }

  loadResult(id: number): void {
    this.store.dispatch(ResultExistsGuardActions.loadResult({ id }));
  }

  sort(sort: Sort): void {
    this.store.dispatch(ResultsPageActions.sortResults({ sort }));
  }

  update(result: Result): void {
    this.store.dispatch(ResultDetailPageActions.updateResult({ result }));
  }
}
