import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exam } from '../../results/models';
import { Pagination } from '../../shared/models';
import { AllExamsExistsGuardActions } from '../actions';
import * as fromExams from '../reducers';

@Injectable()
export class ExamsFacadeService {
  allExams$: Observable<Exam[]>;
  pagination$: Observable<Pagination>;
  selectAllExamsLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromExams.State>) {
    this.allExams$ = this.store.pipe(select(fromExams.selectExams));

    this.pagination$ = this.store.pipe(select(fromExams.selectExamsPagination));

    this.selectAllExamsLoaded$ = this.store.pipe(
      select(fromExams.selectAllExamsLoaded)
    );

    this.sort$ = this.store.pipe(select(fromExams.selectExamsSort));
  }

  loadAll(): void {
    this.store.dispatch(AllExamsExistsGuardActions.loadAllExams());
  }
}
