import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { Exam, Pagination } from '../../../core/models';
import { LayoutFacadeService } from '../../../core/services';
import { ExamsFacadeService } from '../../services';

@Component({
  selector: 'app-exams-page',
  templateUrl: './exams-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExamsPageComponent {
  exams$: Observable<Exam[]>;
  isHandsetPortrait$: Observable<boolean>;
  pagination$: Observable<Pagination>;
  sort$: Observable<Sort>;

  constructor(
    private examsFacadeService: ExamsFacadeService,
    private layoutFacadeService: LayoutFacadeService
  ) {
    this.exams$ = this.examsFacadeService.exams$;
    this.isHandsetPortrait$ = this.layoutFacadeService.isHandsetPortrait$;
    this.pagination$ = this.examsFacadeService.pagination$;
    this.sort$ = this.examsFacadeService.sort$;
  }

  onAdd(): void {
    this.examsFacadeService.add();
  }

  onChangePage(event: PageEvent): void {
    this.examsFacadeService.changePage(event.pageIndex + 1);
  }

  onDelete(id: number): void {
    this.examsFacadeService.delete(id);
  }

  onEdit(exam: Exam): void {
    this.examsFacadeService.edit(exam);
  }

  onSortEvent(sort: Sort) {
    this.examsFacadeService.sort(sort);
  }
}
