import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Exam, Unit } from '../../../core/models';
import { LayoutFacadeService } from '../../../core/services';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { AllUnitsFacadeService, ExamsFacadeService } from '../../services';

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
  units$: Observable<ReadonlyArray<Unit>>;

  constructor(
    private allUnitsFacadeService: AllUnitsFacadeService,
    private examsFacadeService: ExamsFacadeService,
    // private examsResultsFacadeService: ExamsResultsFacadeService,
    private layoutFacadeService: LayoutFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {
    this.exam$ = this.examsFacadeService.selected$;
    // this.examsResults$ = this.examsResultsFacadeService.examsResults$;
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    // this.pagination$ = this.examsResultsFacadeService.pagination$;
    this.pending$ = this.spinnerFacadeService.isLoading$;
    // this.sort$ = this.examsResultsFacadeService.sort$;
    this.units$ = this.allUnitsFacadeService.allUnits$;
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
    this.examsFacadeService.create(exam);
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
    this.examsFacadeService.update(exam);
  }
}
