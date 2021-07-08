import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models';
import { ResultDetailPageActions, ResultsPageActions } from '../actions';
import { ExamResult } from '../models';
import * as fromResults from '../reducers';

@Injectable()
export class ExamsResultsFacadeService {
  examsResults$: Observable<ExamResult[]>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromResults.State>) {
    this.examsResults$ = this.store.pipe(
      select(fromResults.selectAllExamsResults)
    );

    this.pagination$ = this.store.pipe(
      select(fromResults.selectExamsResultsPagination)
    );

    this.sort$ = this.store.pipe(select(fromResults.selectExamsResultsSort));
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(
      ResultDetailPageActions.changePageResults({ pageIndex })
    );
  }

  delete(id: number, resultId: number): void {
    this.store.dispatch(ResultDetailPageActions.deleteExamResult({ id, resultId }));
  }

  load(): void {
    this.store.dispatch(ResultDetailPageActions.loadExamsResults());
  }

  sort(sort: Sort): void {
    this.store.dispatch(ResultDetailPageActions.sortResults({ sort }));
  }
}
