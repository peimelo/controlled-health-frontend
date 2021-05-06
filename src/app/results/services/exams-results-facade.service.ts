import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../shared/models';
import { ResultDetailPageActions } from '../actions';
import { ExamResult } from '../models';
import * as fromResults from '../reducers';

@Injectable()
export class ExamsResultsFacadeService {
  examsResults$: Observable<ExamResult[]>;
  pagination$: Observable<Pagination>;

  constructor(private store: Store<fromResults.State>) {
    this.examsResults$ = this.store.pipe(
      select(fromResults.selectAllExamsResults)
    );

    this.pagination$ = this.store.pipe(
      select(fromResults.selectExamsResultsPagination)
    );
  }

  loadExamsResults(): void {
    this.store.dispatch(ResultDetailPageActions.loadExamsResults());
  }
}
