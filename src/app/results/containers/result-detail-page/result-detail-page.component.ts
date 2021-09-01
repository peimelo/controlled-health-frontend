import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { SpinnerFacadeService } from '../../../core/services/spinner-facade.service';
import { LayoutFacadeService } from '../../../shared/services';
import { Result } from '../../models';
import { ExamsResultsFacadeService } from '../../services/exams-results-facade.service';
import { ResultsFacadeService } from '../../services/results-facade.service';

@Component({
  selector: 'app-result-detail-page',
  templateUrl: './result-detail-page.component.html',
  styleUrls: ['./result-detail-page.component.scss'],
})
export class ResultDetailPageComponent implements OnInit {
  isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
  examsResults$ = this.examsResultsFacadeService.examsResults$;
  pagination$ = this.examsResultsFacadeService.pagination$;
  pending$ = this.spinnerFacadeService.isLoading$;
  result$ = this.resultsFacadeService.selected$;
  sort$ = this.examsResultsFacadeService.sort$;

  constructor(
    private examsResultsFacadeService: ExamsResultsFacadeService,
    private layoutFacadeService: LayoutFacadeService,
    private resultsFacadeService: ResultsFacadeService,
    private spinnerFacadeService: SpinnerFacadeService
  ) {}

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
