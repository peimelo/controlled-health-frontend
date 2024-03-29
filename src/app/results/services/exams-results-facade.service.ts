import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Pagination } from '../../core/models';
import {
  ExamResultFormDialogPageActions,
  ResultDetailPageActions,
} from '../actions';
import { ExamGraphic, ExamResult } from '../models';
import * as fromResults from '../reducers';

@Injectable()
export class ExamsResultsFacadeService {
  examGraphics$: Observable<ExamGraphic[]>;
  examsResults$: Observable<ExamResult[]>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;

  constructor(private store: Store<fromResults.State>) {
    this.examGraphics$ = this.store.pipe(
      select(fromResults.selectExamGraphics)
    );

    this.examsResults$ = this.store.pipe(
      select(fromResults.selectExamsResultsList)
    );

    this.pagination$ = this.store.pipe(
      select(fromResults.selectExamsResultsPagination)
    );

    this.sort$ = this.store.pipe(select(fromResults.selectExamsResultsSort));
  }

  add(): void {
    this.store.dispatch(ResultDetailPageActions.addExamResult());
  }

  changePage(pageIndex: number): void {
    this.store.dispatch(
      ResultDetailPageActions.changePageResults({ pageIndex })
    );
  }

  chart(examId: number): void {
    this.store.dispatch(ResultDetailPageActions.chart({ examId }));
  }

  create(examResult: ExamResult, resultId: number): void {
    this.store.dispatch(
      ExamResultFormDialogPageActions.createExamResult({ examResult, resultId })
    );
  }

  delete(id: number, resultId: number): void {
    this.store.dispatch(
      ResultDetailPageActions.deleteExamResult({ id, resultId })
    );
  }

  edit(examResult: ExamResult): void {
    this.store.dispatch(ResultDetailPageActions.editExamResult({ examResult }));
  }

  sort(sort: Sort): void {
    this.store.dispatch(ResultDetailPageActions.sortResults({ sort }));
  }

  update(examResult: ExamResult, resultId: number): void {
    this.store.dispatch(
      ExamResultFormDialogPageActions.updateExamResult({ examResult, resultId })
    );
  }
}
