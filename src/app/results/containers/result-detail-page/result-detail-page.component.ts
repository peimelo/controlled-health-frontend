import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { Pagination } from '../../../shared/models';
import { LayoutFacadeService } from '../../../shared/services';
import { ExamResult, Result } from '../../models';
import { ExamsResultsFacadeService } from '../../services/exams-results-facade.service';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
})
export class ResultDetailPageComponent implements OnInit {
  isHandsetPortrait$: Observable<boolean>;
  examsResults$: Observable<ExamResult[]>;
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
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    this.examsResults$ = this.examsResultsFacadeService.examsResults$;
    this.pagination$ = this.examsResultsFacadeService.pagination$;
    this.pending$ = this.spinnerFacadeService.isLoading$;
    this.result$ = this.resultsFacadeService.selected$;
    this.sort$ = this.examsResultsFacadeService.sort$;
  }

  ngOnInit(): void {
    this.examsResultsFacadeService.load();
  }

  onAdd(): void {
    this.examsResultsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.examsResultsFacadeService.changePage(event.pageIndex + 1);
  }

  onDeleteExamResult(event: any): void {
    const { id, resultId } = event;
    this.examsResultsFacadeService.delete(id, resultId);
  }

  onSortEvent(sort: Sort) {
    this.examsResultsFacadeService.sort(sort);
  }

  onUpdateResult(result: Result): void {
    this.resultsFacadeService.update(result);
  }
}
