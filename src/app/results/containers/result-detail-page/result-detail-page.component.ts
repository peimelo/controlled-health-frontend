import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Pagination } from '../../../core/models';
import { LayoutFacadeService } from '../../../core/services';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import {
  ExamGraphic,
  ExamResult,
  ExamResultDeleteEvent,
  Result,
} from '../../models';
import { ExamsResultsFacadeService } from '../../services/exams-results-facade.service';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResultDetailPageComponent {
  examGraphics$: Observable<ExamGraphic[]>;
  examsResults$: Observable<ExamResult[]>;
  isHandsetPortrait$: Observable<boolean>;
  pagination$: Observable<Pagination>;
  pending$: Observable<boolean>;
  result$: Observable<Result | null>;
  sort$: Observable<Sort>;

  constructor(
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private layoutFacadeService: LayoutFacadeService,
    private resultsFacadeService: ResultsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.examGraphics$ = this.examsResultsFacadeService.examGraphics$;
    this.examsResults$ = this.examsResultsFacadeService.examsResults$;
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    this.pagination$ = this.examsResultsFacadeService.pagination$;
    this.pending$ = this.spinnerFacadeService.isLoading$;
    this.result$ = this.resultsFacadeService.selected$;
    this.sort$ = this.examsResultsFacadeService.sort$;
  }

  onAdd(): void {
    this.examsResultsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.examsResultsFacadeService.changePage(event.pageIndex + 1);
  }

  onChart(examId: number): void {
    this.examsResultsFacadeService.chart(examId);
  }

  onCreateResult(result: Result): void {
    this.resultsFacadeService.create(result);
  }

  onDeleteExamResult({ id, resultId }: ExamResultDeleteEvent): void {
    this.examsResultsFacadeService.delete(id, resultId);
  }

  onEdit(examResult: ExamResult): void {
    this.examsResultsFacadeService.edit(examResult);
  }

  onSortEvent(sort: Sort) {
    this.examsResultsFacadeService.sort(sort);
  }

  onUpdateResult(result: Result): void {
    this.resultsFacadeService.update(result);
  }
}
