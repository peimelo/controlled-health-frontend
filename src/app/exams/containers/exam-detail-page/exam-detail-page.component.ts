import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Exam } from '../../../core/models';
import { LayoutFacadeService } from '../../../core/services';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { ExamsFacadeService } from '../../services';

@Component({
  selector: 'app-exam-detail-page',
  templateUrl: './exam-detail-page.component.html',
  styleUrls: ['./exam-detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamDetailPageComponent {
  exam$: Observable<Exam | null>;
  // examsResults$: Observable<ExamResult[]>;
  isHandsetPortrait$: Observable<boolean>;
  // pagination$: Observable<Pagination>;
  pending$: Observable<boolean>;
  // sort$: Observable<Sort>;

  constructor(
    // private examsResultsFacadeService: ExamsResultsFacadeService,
    private layoutFacadeService: LayoutFacadeService,
    private examsFacadeService: ExamsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.exam$ = this.examsFacadeService.selected$;
    // this.examsResults$ = this.examsResultsFacadeService.examsResults$;
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    // this.pagination$ = this.examsResultsFacadeService.pagination$;
    this.pending$ = this.spinnerFacadeService.isLoading$;
    // this.sort$ = this.examsResultsFacadeService.sort$;
  }

  onAdd(): void {
    // this.examsResultsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    // this.examsResultsFacadeService.changePage(event.pageIndex + 1);
  }

  onChart(examId: number): void {
    // this.examsResultsFacadeService.chart(examId);
  }

  onCreateExam(exam: Exam): void {
    // this.resultsFacadeService.create(result);
  }

  onDeleteExamResult({ id, resultId }: any): void {
    // this.examsResultsFacadeService.delete(id, resultId);
  }

  onEdit(examResult: any): void {
    // this.examsResultsFacadeService.edit(examResult);
  }

  onSortEvent(sort: Sort) {
    // this.examsResultsFacadeService.sort(sort);
  }

  onUpdateExam(exam: Exam): void {
    // this.resultsFacadeService.update(result);
  }
}
