import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Exam, Pagination } from '../../core/models';
import {
  ExamExistsGuardActions,
  ExamsGuardActions,
  ExamsPageActions,
} from '../actions';
import * as fromExams from '../reducers';

@Injectable()
export class ExamsFacadeService {
  exams$: Observable<Exam[]>;
  pagination$: Observable<Pagination>;
  selected$: Observable<Exam | null>;
  selectedLoaded$: Observable<boolean>;
  selectListLoaded$: Observable<boolean>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromExams.State>) {
    this.exams$ = this.store.pipe(select(fromExams.selectList));

    this.pagination$ = this.store.pipe(select(fromExams.selectPagination));

    this.selected$ = this.store.pipe(select(fromExams.selectSelected));

    this.selectedLoaded$ = this.store.pipe(
      select(fromExams.selectSelectedLoaded)
    );

    this.selectListLoaded$ = this.store.pipe(
      select(fromExams.selectListLoaded)
    );

    this.sort$ = this.store.pipe(select(fromExams.selectSort));
  }

  add(): void {
    this.store.dispatch(ExamsPageActions.addExam());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(ExamsPageActions.changePageExams({ pageIndex }));
  }

  // create(exam: Exam): void {
  //   this.store.dispatch(ResultDetailPageActions.createResult({ exam }));
  // }

  delete(id: number): void {
    this.store.dispatch(ExamsPageActions.deleteExam({ id }));
  }

  edit(exam: Exam): void {
    this.store.dispatch(ExamsPageActions.editExam({ exam }));
  }

  load(): void {
    this.store.dispatch(ExamsGuardActions.loadExams());
  }

  loadExam(id: number): void {
    this.store.dispatch(ExamExistsGuardActions.loadExam({ id }));
  }

  sort(sort: Sort): void {
    this.store.dispatch(ExamsPageActions.sortExams({ sort }));
  }

  // update(exam: Exam): void {
  //   this.store.dispatch(ResultDetailPageActions.updateResult({ exam }));
  // }
}
